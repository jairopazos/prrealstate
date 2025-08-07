import React, { useEffect, useRef, useState } from 'react';
import * as Marzipano from 'marzipano';

const MarzipanoTour = ({ panoramas, hotspots }) => {
    const containerRef = useRef(null);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const viewerRef = useRef(null);
    const scenesRef = useRef([]);

    useEffect(() => {
        if (!panoramas?.length) return;

        const viewer = new Marzipano.Viewer(containerRef.current);
        viewerRef.current = viewer;

        const scenes = panoramas.map((panoramaUrl, index) => {
            const source = Marzipano.ImageUrlSource.fromString(panoramaUrl);
            const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
            const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
            const view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

            return viewer.createScene({
                source,
                geometry,
                view,
                pinFirstLevel: true
            });
        });

        scenesRef.current = scenes;

        // Mostrar la primera escena
        const initialScene = scenes[0];
        initialScene.switchTo({ transitionDuration: 1000 });

        // Ajustar el tamaño del canvas
        setTimeout(() => {
            const canvas = containerRef.current.querySelector('canvas');
            if (canvas) {
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            viewer.updateSize();
        }, 50);

        return () => scenes.forEach(scene => scene.destroy());
    }, [panoramas, hotspots]);

    const goToScene = (index) => {
        if (index >= 0 && index < scenesRef.current.length) {
            const newScene = scenesRef.current[index];
            newScene.switchTo({ transitionDuration: 1000 });
            setCurrentSceneIndex(index);
        }
    };

    return (
        <div>
            <div
                ref={containerRef}
                className="marzipano-container"
                style={{
                    // CAMBIO AQUI: De '1200px' a '100%'
                    width: '100%',
                    height: '500px', // Puedes mantener este fijo o hacerlo relativo también
                    margin: '0 auto',
                    border: '1px solid #ccc',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Botones de navegación */}
                <div style={{ position: 'absolute', top: '50%', left: '20px', zIndex: 10, transform: 'translateY(-50%)' }}>
                    <button
                        style={{ background: 'transparent', border: 'none', fontSize: '30px', cursor: 'pointer' }}
                        onClick={() => goToScene(currentSceneIndex - 1)}
                        disabled={currentSceneIndex === 0}
                    >
                        &#8592;
                    </button>
                </div>

                <div style={{ position: 'absolute', top: '50%', right: '20px', zIndex: 10, transform: 'translateY(-50%)' }}>
                    <button
                        style={{ background: 'transparent', border: 'none', fontSize: '30px', cursor: 'pointer' }}
                        onClick={() => goToScene(currentSceneIndex + 1)}
                        disabled={currentSceneIndex === panoramas.length - 1}
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarzipanoTour;