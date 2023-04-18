import { Behaviour, GameObject, serializable, AssetReference } from "@needle-tools/engine";

export class LoadingScenes extends Behaviour {
    // tell the component compiler that we want to reference an array of SceneAssets
    // @type UnityEditor.SceneAsset[]
    @serializable(AssetReference)
    scenes?: AssetReference[];

    private currentIndex: number = 0;
    private currentScene: AssetReference | undefined = undefined;

    async awake() {
        console.log(this.scenes?.length);
        this.loadAtIndex(0);
        // if (!this.scenes?.length) return;
        // const startScene = this.scenes[0];
        // this.currentScene = startScene;
        // console.log("TEST");
    }

    onDestroy(): void {
        if (!this.scenes) return;
        for (const scene of this.scenes) {
            scene?.unload();
        }
    }

    loadAtIndex(idx: number){
        if (!this.scenes?.length) return;

        if (idx < 0) idx = this.scenes.length - 1;
        if (idx >= this.scenes.length) idx = 0;
        const scene = this.scenes[idx];
        this.switchScene(scene);
    }

    async switchScene(scene: AssetReference) {
        if (scene === this.currentScene) return;
        if (this.currentScene)
            GameObject.remove(this.currentScene.asset);
        const index = this.currentIndex = this.scenes?.indexOf(scene) ?? -1;
        this.currentScene = scene;
        await scene.loadAssetAsync();
        if (!scene.asset) return;
        if (this.currentIndex === index) {
            GameObject.add(scene.asset, this.gameObject);
            // save the loaded level as an url parameter
            // setParamWithoutReload("level", index.toString());
        }
    }
} 