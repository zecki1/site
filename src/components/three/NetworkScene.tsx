"use client";

// Cena de fundo em 3D que percorre as seções da home.
//
// Rede de pontos que se reorganiza em ícones de desenvolvedor (brackets,
// janela de navegador, raio, chip, chaves de código, rota, usuário, envelope)
// conforme o progresso da rolagem global: cada seção "acorda" a sua formação
// enquanto as vizinhas apagam. As linhas de conexão e os "pacotes de dados"
// viajando dão a sensação de um site/servidor sendo montado ao scrollar.
//
// A tela é `position: fixed` e fica ATRÁS das seções translúcidas (bg-muted/30)
// e do hero — os cards opacos mantêm o texto legível.

import { useEffect, useRef } from "react";

const N = 1200; // pontos
const P = 150; // pontos por formação (N / FORMATIONS)
const FORMATIONS = 8;
const KNN = 5;
const PACKET_COUNT = 20;

type Vec3 = [number, number, number];

const fr = (n: number) => Math.round(n * 1000) / 1000;

const circlePts = (cx: number, cy: number, r: number, n = 14): Vec3[] => {
  const out: Vec3[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    out.push([fr(cx + Math.cos(a) * r), fr(cy + Math.sin(a) * r), 0]);
  }
  return out;
};

const linePts = (a: number[], b: number[], n = 14): Vec3[] => {
  const out: Vec3[] = [];
  const az = a[2] ?? 0;
  const bz = b[2] ?? 0;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    out.push([fr(a[0] + (b[0] - a[0]) * t), fr(a[1] + (b[1] - a[1]) * t), fr(az + (bz - az) * t)]);
  }
  return out;
};

// Cada formação é uma lista de polilinhas 2D no box [-1, 1].
const FORMATION_ICONS: Vec3[][][] = [
  // 0 inicio — brackets < >
  [linePts([-1, 0.85], [-0.35, 0]), linePts([-0.35, 0], [-1, -0.85]), linePts([1, 0.85], [0.35, 0]), linePts([0.35, 0], [1, -0.85]), linePts([-0.2, 0.95], [-0.2, -0.95])],
  // 1 produtos — janela de navegador
  [[...linePts([-1, 0.75], [1, 0.75]), ...linePts([1, 0.75], [1, -0.75]), ...linePts([1, -0.75], [-1, -0.75]), ...linePts([-1, -0.75], [-1, 0.75]), ...circlePts(-0.72, 0.5, 0.09, 10), ...circlePts(-0.5, 0.5, 0.09, 10), ...circlePts(-0.28, 0.5, 0.09, 10), ...linePts([-0.9, 0.2], [0.9, 0.2]), ...linePts([-0.6, -0.1], [0.9, -0.1]), ...linePts([-0.6, -0.4], [0.55, -0.4])]],
  // 2 servicos — raio
  [[...linePts([0.25, -1], [0.7, -0.15]), ...linePts([0.7, -0.15], [-0.6, 0.35]), ...linePts([-0.6, 0.35], [-0.18, 1]), ...linePts([-0.85, 0.85], [-0.5, 0.98]), ...linePts([0.75, -0.95], [0.45, -0.75]), ...linePts([0.9, -0.6], [0.7, -0.4])]],
  // 3 habilidades — chip
  [[...linePts([-0.8, -0.8], [0.8, -0.8]), ...linePts([0.8, -0.8], [0.8, 0.8]), ...linePts([0.8, 0.8], [-0.8, 0.8]), ...linePts([-0.8, 0.8], [-0.8, -0.8]), ...linePts([-0.55, 0.8], [-0.55, 1.1]), ...linePts([-0.18, 0.8], [-0.18, 1.1]), ...linePts([0.18, 0.8], [0.18, 1.1]), ...linePts([0.55, 0.8], [0.55, 1.1]), ...linePts([-0.55, -0.8], [-0.55, -1.1]), ...linePts([-0.18, -0.8], [-0.18, -1.1]), ...linePts([0.18, -0.8], [0.18, -1.1]), ...linePts([0.55, -0.8], [0.55, -1.1]), ...linePts([-0.8, -0.55], [-1.1, -0.55]), ...linePts([-0.8, -0.18], [-1.1, -0.18]), ...linePts([-0.8, 0.18], [-1.1, 0.18]), ...linePts([-0.8, 0.55], [-1.1, 0.55]), ...linePts([0.8, -0.55], [1.1, -0.55]), ...linePts([0.8, -0.18], [1.1, -0.18]), ...linePts([0.8, 0.18], [1.1, 0.18]), ...linePts([0.8, 0.55], [1.1, 0.55]), ...linePts([-0.3, -0.3], [0.3, 0.3]), ...linePts([0.3, -0.3], [-0.3, 0.3]), ...circlePts(0, 0, 0.1, 10)]],
  // 4 codigo — </>
  [[...linePts([-0.75, 0.85], [-0.15, 0]), ...linePts([-0.15, 0], [-0.75, -0.85]), ...linePts([0.7, 0.85], [0.15, 0]), ...linePts([0.15, 0], [0.7, -0.85]), ...linePts([0.1, 0.85], [-0.1, -0.85]), ...linePts([-1, -0.95], [-0.3, -0.95]), ...linePts([0.3, -0.95], [1, -0.95])]],
  // 5 jornada — rota
  [[...linePts([-1, 0.45], [-0.45, -0.35]), ...linePts([-0.45, -0.35], [0.35, 0.5]), ...linePts([0.35, 0.5], [1, -0.15]), ...linePts([1, -0.15], [0.8, -0.1]), ...circlePts(-0.72, 0.05, 0.09, 10), ...circlePts(0, 0.32, 0.09, 10), ...circlePts(0.65, 0.18, 0.09, 10)]],
  // 6 sobre — usuário
  [[...circlePts(0, 0.3, 0.42, 24), ...linePts([-0.9, -0.85], [0, -1.15]), ...linePts([0, -1.15], [0.9, -0.85])]],
  // 7 contato — envelope
  [[...linePts([-1, -0.2], [1, -0.2]), ...linePts([1, -0.2], [1, 0.6]), ...linePts([1, 0.6], [-1, 0.6]), ...linePts([-1, 0.6], [-1, -0.2]), ...linePts([-1, 0.6], [0, 0.1]), ...linePts([0, 0.1], [1, 0.6]), ...linePts([-0.6, -0.6], [0.6, -0.6])]],
];

// Amostra uma formação em `count` pontos (distribuição ponderada por comprimento).
function sampleIcon(icon: Vec3[][], count: number): Float32Array {
  const segs: { a: Vec3; b: Vec3 }[] = [];
  for (const poly of icon) {
    for (let i = 0; i < poly.length - 1; i++) segs.push({ a: poly[i], b: poly[i + 1] });
  }
  const lens = segs.map(({ a, b }) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  const tot = lens.reduce((s, v) => s + v, 0) || 1;
  const out = new Float32Array(count * 3);
  for (let s = 0; s < count; s++) {
    let r = Math.random() * tot;
    let si = 0;
    for (let k = 0; k < lens.length; k++) {
      if (r < lens[k]) { si = k; break; }
      r -= lens[k];
    }
    const t = Math.random();
    const { a, b } = segs[si];
    out[s * 3] = fr(a[0] + (b[0] - a[0]) * t);
    out[s * 3 + 1] = fr(a[1] + (b[1] - a[1]) * t);
    out[s * 3 + 2] = fr((Math.random() - 0.5) * 0.08);
  }
  return out;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);

export function NetworkScene({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let alive = true;
    let raf = 0;

    void (async () => {
      const THREE = await import("three");
      if (!alive) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const size = { w: window.innerWidth, h: window.innerHeight, dpr: Math.min(window.devicePixelRatio || 1, 1.5) };

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(size.dpr);
      renderer.setSize(size.w, size.h);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, size.w / size.h, 0.1, 30);
      camera.position.set(0, 0, 3.4);

      const isDark = () => document.documentElement.classList.contains("dark");
      let dark = isDark();

      const targets: Float32Array[] = FORMATION_ICONS.map((icon) => sampleIcon(icon, P));
      const positions = new Float32Array(N * 3);
      const nodeColors = new Float32Array(N * 3);
      const basePos = new Float32Array(N * 3);
      const phase = new Float32Array(N);
      const home = new Uint8ClampedArray(N);
      for (let i = 0; i < N; i++) {
        const f = Math.floor(i / P);
        const s = i - f * P;
        home[i] = f;
        basePos[i * 3] = targets[f][s * 3];
        basePos[i * 3 + 1] = targets[f][s * 3 + 1];
        basePos[i * 3 + 2] = targets[f][s * 3 + 2];
        positions[i * 3] = basePos[i * 3] * 0.5;
        positions[i * 3 + 1] = basePos[i * 3 + 1] * 0.5;
        positions[i * 3 + 2] = basePos[i * 3 + 2] * 0.5;
        phase[i] = Math.random() * Math.PI * 2;
      }

      const slotPos = (f: number, s: number) => {
        const o = s * 3;
        return [targets[f][o], targets[f][o + 1], targets[f][o + 2]];
      };

      // Grafos de vizinhos: KNN sobre a formação 0 (topologia estável).
      const edges: number[][] = [];
      for (let i = 0; i < N; i++) {
        const xi = basePos[i * 3], yi = basePos[i * 3 + 1], zi = basePos[i * 3 + 2];
        const near: number[][] = [];
        for (let j = 0; j < N; j++) {
          if (j === i) continue;
          const dx = xi - basePos[j * 3], dy = yi - basePos[j * 3 + 1], dz = zi - basePos[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          let inserted = false;
          for (let k = 0; k < near.length; k++) {
            if (d2 < near[k][1]) { near.splice(k, 0, [j, d2]); inserted = true; break; }
          }
          if (!inserted && near.length < KNN) near.push([j, d2]);
          if (near.length > KNN) near.pop();
        }
        for (let k = 0; k < near.length; k++) {
          if (near[k][0] > i) edges.push([i, near[k][0]]);
        }
      }

      // Nós (Points) e arestas (LineSegments).
      const gPos = new THREE.BufferGeometry();
      gPos.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      gPos.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
      const nodeMat = new THREE.PointsMaterial({ size: 0.075, vertexColors: true, transparent: true, opacity: 0.9, blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending, sizeAttenuation: true });
      const nodes = new THREE.Points(gPos, nodeMat);
      nodes.frustumCulled = false;

      const edgePos = new Float32Array(edges.length * 2 * 3);
      const edgeCol = new Float32Array(edges.length * 2 * 3);
      const gEdges = new THREE.BufferGeometry();
      gEdges.setAttribute("position", new THREE.BufferAttribute(edgePos, 3));
      gEdges.setAttribute("color", new THREE.BufferAttribute(edgeCol, 3));
      const edgeMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8, blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending });
      const lines = new THREE.LineSegments(gEdges, edgeMat);
      lines.frustumCulled = false;

      // Pacotes de dados viajando pelas conexões.
      const packetPos = new Float32Array(PACKET_COUNT * 3);
      const gPack = new THREE.BufferGeometry();
      gPack.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
      const packMat = new THREE.PointsMaterial({ size: 0.16, color: dark ? 0xffffff : 0x0e7490, transparent: true, opacity: 0.95, blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending, sizeAttenuation: true });
      const packs = new THREE.Points(gPack, packMat);
      packs.frustumCulled = false;

      const group = new THREE.Group();
      group.add(nodes, lines, packs);
      scene.add(group);

      const packets = Array.from({ length: PACKET_COUNT }, () => ({ edge: Math.floor(Math.random() * edges.length), t: Math.random(), speed: 0.4 + Math.random() * 0.7 }));
      const wake = new Float32Array(N);
      const colorRaw = dark ? [0.05, 0.9, 1] : [0.05, 0.45, 0.56];
      const colorViolet = dark ? [0.7, 0.35, 1] : [0.25, 0.2, 0.55];

      const readScroll = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        return clamp01(window.scrollY / max);
      };

      let e = 0;
      const compute = (now: number) => {
        const p = readScroll();
        const f = p * (FORMATIONS - 1);
        const f0 = Math.min(FORMATIONS - 2, Math.floor(f));
        const frac = smooth(f - Math.floor(f));
        const tSec = now * 0.001;

        for (let i = 0; i < N; i++) wake[i] = clamp01(1 - Math.abs(f - home[i]) * 1.1);

        const scale = 1 + 0.03 * Math.sin(tSec * 0.7);
        for (let i = 0; i < N; i++) {
          const s = i - home[i] * P;
          const [ax, ay, az] = slotPos(f0, s);
          const [bx, by, bz] = slotPos(f0 + 1, s);
          positions[i * 3] = (ax + (bx - ax) * frac) * scale + 0.05 * wake[i] * Math.sin(tSec * 1.6 + phase[i]);
          positions[i * 3 + 1] = (ay + (by - ay) * frac) * scale + 0.03 * Math.cos(tSec * 2.1 + phase[i] * 2);
          positions[i * 3 + 2] = (az + (bz - az) * frac) * scale + 0.015 * Math.sin(tSec * 1.3 + phase[i]);

          const g = f / (FORMATIONS - 1);
          const w = wake[i];
          const k = 0.25 + 0.75 * w;
          nodeColors[i * 3] = (colorRaw[0] + (colorViolet[0] - colorRaw[0]) * g) * k;
          nodeColors[i * 3 + 1] = (colorRaw[1] + (colorViolet[1] - colorRaw[1]) * g) * k;
          nodeColors[i * 3 + 2] = (colorRaw[2] + (colorViolet[2] - colorRaw[2]) * g) * k;
        }

        // Arestas: acendem quando os extremos estão ativos e próximos.
        e = 0;
        for (let idx = 0; idx < edges.length; idx++) {
          const [a, b] = edges[idx];
          const w = Math.min(wake[a], wake[b]);
          if (w < 0.06) continue;
          const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2];
          const bx = positions[b * 3], by = positions[b * 3 + 1], bz = positions[b * 3 + 2];
          const d2 = (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2;
          const str = w * clamp01(1 - d2 * 1.8);
          if (str < 0.04) continue;
          const o = e * 6;
          edgePos[o] = ax; edgePos[o + 1] = ay; edgePos[o + 2] = az;
          edgePos[o + 3] = bx; edgePos[o + 4] = by; edgePos[o + 5] = bz;
          edgeCol[o] = colorRaw[0] * str; edgeCol[o + 1] = colorRaw[1] * str; edgeCol[o + 2] = colorRaw[2] * str;
          edgeCol[o + 3] = colorRaw[0] * str; edgeCol[o + 4] = colorRaw[1] * str; edgeCol[o + 5] = colorRaw[2] * str;
          e++;
        }
        gEdges.attributes.position.needsUpdate = true;
        gEdges.attributes.color.needsUpdate = true;
        gEdges.setDrawRange(0, e * 2);

        for (let k = 0; k < PACKET_COUNT; k++) {
          const pk = packets[k];
          pk.t += pk.speed / 120;
          if (pk.t > 1) { pk.t = 0; pk.edge = Math.floor(Math.random() * edges.length); }
          const [a, b] = edges[pk.edge] ?? edges[0];
          if (wake[a] < 0.15 || wake[b] < 0.15) {
            packetPos[k * 3] = 9999; packetPos[k * 3 + 1] = 9999; packetPos[k * 3 + 2] = 9999;
            continue;
          }
          const tt = pk.t;
          packetPos[k * 3] = positions[a * 3] + (positions[b * 3] - positions[a * 3]) * tt;
          packetPos[k * 3 + 1] = positions[a * 3 + 1] + (positions[b * 3 + 1] - positions[a * 3 + 1]) * tt;
          packetPos[k * 3 + 2] = positions[a * 3 + 2] + (positions[b * 3 + 2] - positions[a * 3 + 2]) * tt;
        }

        group.rotation.y = Math.sin(tSec * 0.12) * 0.5;
        group.rotation.z = Math.sin(tSec * 0.08) * 0.12;
        group.position.y = Math.sin(tSec * 0.3) * 0.15;
        camera.position.z = 3.4 + Math.sin(tSec * 0.15) * 0.25;
        camera.lookAt(0, 0, 0);

        gPos.attributes.position.needsUpdate = true;
        gPos.attributes.color.needsUpdate = true;
        renderer.render(scene, camera);
      };

      const loop = () => {
        if (!alive) return;
        compute(performance.now());
        if (!reduceMotion) raf = requestAnimationFrame(loop);
      };

      const sync = () => {
        renderer.setSize(size.w, size.h);
        camera.aspect = size.w / size.h;
        camera.updateProjectionMatrix();
      };
      const onResize = () => { size.w = window.innerWidth; size.h = window.innerHeight; sync(); loop(); };
      window.addEventListener("resize", onResize);

      const onVisibility = () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else loop();
      };
      document.addEventListener("visibilitychange", onVisibility);

      // Troca de tema ao vivo (modo claro/escuro).
      const themeObs = new MutationObserver(() => {
        const nd = isDark();
        if (nd === dark) return;
        dark = nd;
        const c = nd ? [0.05, 0.9, 1] : [0.05, 0.45, 0.56];
        nodeMat.blending = nd ? THREE.AdditiveBlending : THREE.NormalBlending;
        edgeMat.blending = nd ? THREE.AdditiveBlending : THREE.NormalBlending;
        packMat.blending = nd ? THREE.AdditiveBlending : THREE.NormalBlending;
        packMat.color.set(nd ? 0xffffff : 0x0e7490);
        colorRaw[0] = c[0]; colorRaw[1] = c[1]; colorRaw[2] = c[2];
      });
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      loop();

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        themeObs.disconnect();
        renderer.dispose();
        gPos.dispose();
        gEdges.dispose();
        gPack.dispose();
        nodeMat.dispose();
        edgeMat.dispose();
        packMat.dispose();
      };
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className ?? ""}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}