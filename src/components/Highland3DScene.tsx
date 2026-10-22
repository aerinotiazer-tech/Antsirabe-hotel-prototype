import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Compass, Eye, EyeOff, RotateCw, SunMedium, Moon } from 'lucide-react';

interface Highland3DSceneProps {
  className?: string;
}

export const Highland3DScene: React.FC<Highland3DSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'terrace' | 'pavilion'>('overview');
  const [activeMood, setActiveMood] = useState<'golden' | 'twilight'>('golden');
  const [isRotating, setIsRotating] = useState(true);

  // References to communicate with render loop without tearing down WebGL
  const stateRef = useRef({
    targetCamPos: new THREE.Vector3(12, 10, 16),
    targetLookAt: new THREE.Vector3(0, 2, 0),
    isRotating: true,
    lightMood: 'golden',
    userInteracting: false,
    pointerX: 0,
    pointerY: 0
  });

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    stateRef.current.lightMood = activeMood;
  }, [activeMood]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL Guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      stateRef.current.isRotating = false;
      setIsRotating(false);
    }

    // 2. Scene, Camera, Renderer
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5EFE6);
    scene.fog = new THREE.Fog(0xF5EFE6, 18, 38);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(12, 10, 16);
    camera.lookAt(0, 2, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false
      });
    } catch {
      setIsSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // Studio RoomEnvironment reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xEAE2D7, 0x5A6B5C, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xFFE8D6, 2.0);
    keyLight.position.set(15, 20, 10);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 40;
      const d = 12;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xA8BDAB, 0.6);
    fillLight.position.set(-10, 8, -10);
    scene.add(fillLight);

    // 4. Procedural Highland Sculpture (Composite 3-12 Part Model in THREE.Group)
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Part 1: Layered Terraces (Stylized Highland Hills of Vakinankaratra)
    const basePlateGeo = new THREE.CylinderGeometry(8, 8.4, 0.4, 48);
    const stoneBaseMat = new THREE.MeshStandardMaterial({
      color: 0x4A392F,
      roughness: 0.85,
      metalness: 0.05
    });
    const basePlate = new THREE.Mesh(basePlateGeo, stoneBaseMat);
    basePlate.position.y = 0.2;
    basePlate.receiveShadow = !isSoftwareGl;
    sculptureGroup.add(basePlate);

    // Terraced tiers
    const tierColors = [0x7A8D7C, 0x8FA491, 0xA2B5A4, 0xB67A4F, 0xD49265];
    const tierRadii = [7.2, 5.8, 4.4, 3.2, 2.2];
    const tiersGroup = new THREE.Group();
    sculptureGroup.add(tiersGroup);

    tierRadii.forEach((radius, idx) => {
      const tierGeo = new THREE.CylinderGeometry(radius - 0.2, radius, 0.45, 36);
      const tierMat = new THREE.MeshStandardMaterial({
        color: tierColors[idx],
        roughness: 0.65 - idx * 0.05,
        metalness: 0.1
      });
      const tierMesh = new THREE.Mesh(tierGeo, tierMat);
      tierMesh.position.y = 0.65 + idx * 0.42;
      tierMesh.receiveShadow = !isSoftwareGl;
      tierMesh.castShadow = !isSoftwareGl;
      tiersGroup.add(tierMesh);
    });

    // Part 2: Stylized Architectural Pavilion on the terrace summit
    const pavilionGroup = new THREE.Group();
    pavilionGroup.position.set(0, 2.8, 0);
    sculptureGroup.add(pavilionGroup);

    // Pavilion base plinth
    const plinthGeo = new THREE.BoxGeometry(2.2, 0.2, 2.2);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0xDDD1C2,
      roughness: 0.4,
      metalness: 0.15
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.1;
    plinth.castShadow = !isSoftwareGl;
    pavilionGroup.add(plinth);

    // 4 Corner Columns (lathed / extruded procedural cylinders)
    const colGeo = new THREE.CylinderGeometry(0.08, 0.1, 1.2, 16);
    const colMat = new THREE.MeshStandardMaterial({
      color: 0x2C1F18,
      roughness: 0.35,
      metalness: 0.2
    });
    const offsets = [
      [-0.8, -0.8],
      [0.8, -0.8],
      [-0.8, 0.8],
      [0.8, 0.8]
    ];
    offsets.forEach(([cx, cz]) => {
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(cx, 0.7, cz);
      col.castShadow = !isSoftwareGl;
      pavilionGroup.add(col);
    });

    // Warm Lantern light in the pavilion center
    const lanternGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xFFB366,
      emissive: 0xFFAA33,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.8
    });
    const lantern = new THREE.Mesh(lanternGeo, lanternMat);
    lantern.position.set(0, 0.75, 0);
    pavilionGroup.add(lantern);

    // Stylized Roof (Slanted tiered gable evoking highland architecture)
    const roofGeo = new THREE.ConeGeometry(1.6, 0.9, 4);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0xB55F38, // warm terracotta copper
      roughness: 0.3,
      metalness: 0.35
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 1.75, 0);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = !isSoftwareGl;
    pavilionGroup.add(roof);

    // Copper Finial accent
    const finialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12);
    const finialMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.9,
      roughness: 0.15
    });
    const finial = new THREE.Mesh(finialGeo, finialMat);
    finial.position.set(0, 2.35, 0);
    pavilionGroup.add(finial);

    // Part 3: Soft Contact Shadow Grounding Plane
    const contactShadowGeo = new THREE.PlaneGeometry(24, 24);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
      grad.addColorStop(0, 'rgba(40, 30, 24, 0.45)');
      grad.addColorStop(0.5, 'rgba(40, 30, 24, 0.20)');
      grad.addColorStop(1, 'rgba(40, 30, 24, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(canvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6
    });
    const shadowPlane = new THREE.Mesh(contactShadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.02;
    scene.add(shadowPlane);

    // 5. Mouse pointer subtle parallax
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.pointerX = nx;
      stateRef.current.pointerY = ny;
    };
    container.addEventListener('mousemove', handlePointerMove);

    // 6. Animation Loop with Exponential Damping & Software GL pace
    let animId = 0;
    let clock = new THREE.Clock();
    let currentCamPos = camera.position.clone();
    let currentLookAt = new THREE.Vector3(0, 2, 0);

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.1);

      // Subtle rotation if enabled
      if (stateRef.current.isRotating) {
        sculptureGroup.rotation.y += 0.35 * dt;
      }

      // Lighting mood transitions
      if (stateRef.current.lightMood === 'twilight') {
        keyLight.color.setHex(0xE07A5F);
        keyLight.intensity = 1.3;
        hemiLight.color.setHex(0x5E503F);
        scene.background = new THREE.Color(0xEAE0D5);
        scene.fog?.color.setHex(0xEAE0D5);
      } else {
        keyLight.color.setHex(0xFFE8D6);
        keyLight.intensity = 2.0;
        hemiLight.color.setHex(0xEAE2D7);
        scene.background = new THREE.Color(0xF5EFE6);
        scene.fog?.color.setHex(0xF5EFE6);
      }

      // Parallax offset
      const px = stateRef.current.pointerX * 1.5;
      const py = stateRef.current.pointerY * 1.0;
      const desiredPos = stateRef.current.targetCamPos.clone().add(new THREE.Vector3(px, py, 0));

      // Damped camera interpolation
      currentCamPos.lerp(desiredPos, 1 - Math.exp(-4 * dt));
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(stateRef.current.targetLookAt, 1 - Math.exp(-4 * dt));
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Safe paced callback for software WebGL
        animId = window.setTimeout(tick, 60);
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    tick();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (isSoftwareGl) {
        clearTimeout(animId);
      } else {
        cancelAnimationFrame(animId);
      }
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const changeView = (view: 'overview' | 'terrace' | 'pavilion') => {
    setActiveView(view);
    if (view === 'overview') {
      stateRef.current.targetCamPos.set(12, 10, 16);
      stateRef.current.targetLookAt.set(0, 2, 0);
    } else if (view === 'terrace') {
      stateRef.current.targetCamPos.set(9, 4, 10);
      stateRef.current.targetLookAt.set(0, 1.8, 0);
    } else if (view === 'pavilion') {
      stateRef.current.targetCamPos.set(3, 4, 4.5);
      stateRef.current.targetLookAt.set(0, 3.4, 0);
    }
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-[#F5EFE6] shadow-sm border border-[#E8DFD3] ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="w-full h-[400px] sm:h-[460px] cursor-grab active:cursor-grabbing"
        aria-label="Animation 3D décorative représentant les reliefs des hauts-plateaux d'Antsirabe"
        role="img"
      />

      {/* Subtle contextual caption badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none max-w-[85%] sm:max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2]/90 border border-[#D9CFC4] text-xs text-[#5D4E43] shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#B55F38]" />
          <span>Évocation 3D abstraite • Reliefs des Hauts-Plateaux (non contractuelle)</span>
        </div>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Consolidated, no side obstruction) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-[92%] sm:w-auto max-w-xl">
        <div className="flex flex-col items-center">
          {/* Collapse/Expand tab */}
          <button
            type="button"
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="mb-1 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium tracking-wide uppercase text-[#5D4E43] bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] border border-[#D9CFC4] rounded-t-md shadow-xs transition-colors"
            aria-label={isDockCollapsed ? "Afficher les réglages 3D" : "Masquer les réglages 3D"}
          >
            {isDockCollapsed ? (
              <>
                <Eye className="w-3 h-3 text-[#B55F38]" />
                <span>Afficher la régie 3D</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-[#5D4E43]" />
                <span>Masquer la régie 3D</span>
              </>
            )}
          </button>

          {/* Unified horizontal control bar */}
          {!isDockCollapsed && (
            <div className="w-full sm:w-auto flex flex-wrap items-center justify-center gap-2 p-2 bg-[#FAF7F2]/95 border border-[#D9CFC4] rounded-xl shadow-md text-xs">
              {/* Camera Views */}
              <div className="flex items-center gap-1 bg-[#EFE8DD] p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => changeView('overview')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    activeView === 'overview'
                      ? 'bg-[#2B1E16] text-[#FAF7F2] shadow-xs'
                      : 'text-[#5D4E43] hover:text-[#2B1E16]'
                  }`}
                >
                  Vue d'ensemble
                </button>
                <button
                  type="button"
                  onClick={() => changeView('terrace')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    activeView === 'terrace'
                      ? 'bg-[#2B1E16] text-[#FAF7F2] shadow-xs'
                      : 'text-[#5D4E43] hover:text-[#2B1E16]'
                  }`}
                >
                  Reliefs
                </button>
                <button
                  type="button"
                  onClick={() => changeView('pavilion')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    activeView === 'pavilion'
                      ? 'bg-[#2B1E16] text-[#FAF7F2] shadow-xs'
                      : 'text-[#5D4E43] hover:text-[#2B1E16]'
                  }`}
                >
                  Pavillon
                </button>
              </div>

              {/* Lighting Mood Toggle */}
              <div className="flex items-center gap-1 bg-[#EFE8DD] p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveMood('golden')}
                  title="Éclairage lumière dorée"
                  className={`p-1.5 rounded-md transition-all ${
                    activeMood === 'golden'
                      ? 'bg-[#C28251] text-white shadow-xs'
                      : 'text-[#5D4E43] hover:text-[#2B1E16]'
                  }`}
                  aria-label="Ambiance Dorée"
                >
                  <SunMedium className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMood('twilight')}
                  title="Éclairage crépuscule d'altitude"
                  className={`p-1.5 rounded-md transition-all ${
                    activeMood === 'twilight'
                      ? 'bg-[#4A3B32] text-white shadow-xs'
                      : 'text-[#5D4E43] hover:text-[#2B1E16]'
                  }`}
                  aria-label="Ambiance Crépuscule"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Rotation Toggle */}
              <button
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                  isRotating
                    ? 'bg-[#5A6B5C] text-white border-[#5A6B5C]'
                    : 'bg-[#EFE8DD] text-[#5D4E43] border-transparent hover:text-[#2B1E16]'
                }`}
                aria-label={isRotating ? "Mettre la rotation en pause" : "Activer la rotation"}
              >
                <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span>{isRotating ? 'Rotation active' : 'Rotation arrêtée'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
