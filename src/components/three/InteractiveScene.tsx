"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Componente React para a cena Three.js
export const InteractiveScene = () => {
    // useRef para obter uma referência ao elemento <div> que conterá nosso canvas
    const mountRef = useRef<HTMLDivElement>(null);

    // useEffect é usado para configurar a cena Three.js após o componente ser montado.
    // O array vazio [] como segundo argumento garante que este código só rode uma vez.
    useEffect(() => {
        // Garante que o código só execute no lado do cliente e quando o ref estiver pronto
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        // --- 1. CONFIGURAÇÃO DA CENA, CÂMERA E RENDERIZADOR ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5; // Afasta a câmera para podermos ver o objeto

        const renderer = new THREE.WebGLRenderer({
            antialias: true, // Deixa as bordas dos objetos mais suaves
            alpha: true,     // Torna o fundo do canvas transparente
        });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Melhora a qualidade em telas de alta resolução
        currentMount.appendChild(renderer.domElement);

        // --- 2. ILUMINAÇÃO ---
        // Sem luz, o modelo ficaria completamente preto.
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Luz suave que ilumina tudo por igual
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Luz tipo "sol" que cria sombras
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        // --- 3. CARREGANDO O MODELO 3D (.GLB) ---
        const loader = new GLTFLoader();
        let model: THREE.Group; // Variável para guardar a referência ao nosso modelo

        loader.load(
            '/models/Game-controller.glb', // Caminho para o modelo dentro da pasta `public`
            (gltf) => {
                model = gltf.scene;
                // Centraliza o modelo e ajusta a escala se necessário
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center); // Move o modelo para o centro da cena
                model.scale.set(3, 3, 3); // Aumenta o tamanho do modelo (ajuste conforme necessário)
                scene.add(model);
            },
            undefined, // Função de progresso (opcional)
            (error) => {
                console.error('Ocorreu um erro ao carregar o modelo 3D:', error);
            }
        );

        // --- 4. INTERATIVIDADE COM O MOUSE ---
        const mouse = new THREE.Vector2();
        const handleMouseMove = (event: MouseEvent) => {
            // Normaliza as coordenadas do mouse (de -1 a +1)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- 5. LOOP DE ANIMAÇÃO ---
        // Esta função é chamada a cada frame para atualizar a cena
        const animate = () => {
            requestAnimationFrame(animate);

            // Animação sutil baseada na posição do mouse para dar profundidade
            if (model) {
                // Interpola suavemente a rotação do modelo em direção à posição do mouse
                // O valor 0.05 controla a "suavidade" do movimento
                model.rotation.y += (mouse.x * 0.3 - model.rotation.y) * 0.05;
                model.rotation.x += (-mouse.y * 0.3 - model.rotation.x) * 0.05;
            }

            // Renderiza a cena a partir da perspectiva da câmera
            renderer.render(scene, camera);
        };
        animate();

        // --- 6. LIDANDO COM O REDIMENSIONAMENTO DA JANELA ---
        const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- 7. FUNÇÃO DE LIMPEZA ---
        // É essencial remover listeners e o canvas para evitar vazamentos de memória
        // quando o componente for "desmontado" (ex: ao navegar para outra página).
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            // Verifica se currentMount ainda existe antes de remover o filho
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
        };

    }, []); // O array vazio assegura que este useEffect só rode uma vez

    // O <div> que servirá como container para o nosso canvas Three.js
    // Ele é posicionado de forma absoluta para preencher todo o componente pai.
    return (
        <div
            ref={mountRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1 // Garante que fique atrás do conteúdo de texto (que tem z-10)
            }}
        />
    );
};