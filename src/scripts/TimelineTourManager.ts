import { Behaviour, GameObject, serializable, AssetReference } from "@needle-tools/engine";

export class TimelineTourManager extends Behaviour {
    // tell the component compiler that we want to reference an array of SceneAssets
    // @type UnityEditor.SceneAsset[]
    @serializable(AssetReference)
    tourScenes?: AssetReference[];

    private currentIndex: number = 0;
    private currentScene: AssetReference | undefined = undefined;

    async awake() {
        console.log(this.tourScenes?.length);
        this.selectIndex(0);
        // if (!this.scenes?.length) return;
        // const startScene = this.scenes[0];
        // this.currentScene = startScene;
        // console.log("TEST");
    }

    onDestroy(): void {
        if (!this.tourScenes) return;
        for (const scene of this.tourScenes) {
            scene?.unload();
        }
    }

    selectIndex(idx: number){
        if (!this.tourScenes?.length) return;
        this.select(idx);
    }

    selectNext() {
        if (!this.tourScenes?.length) return;
        if(this.currentIndex > this.tourScenes.length) return;
        this.select(this.currentIndex + 1);
    }

    selectPrev() {
        if (!this.tourScenes?.length) return;
        if(this.currentIndex==0) return;
        this.select(this.currentIndex - 1);
    }

    select(index: number) {
        if (!this.tourScenes?.length) return;
        if (index < 0) index = this.tourScenes.length - 1;
        if (index >= this.tourScenes.length) index = 0;
        const scene = this.tourScenes[index];
        this.switchScene(scene);
    }

    async switchScene(scene: AssetReference) {
        if (scene === this.currentScene) return;
        if (this.currentScene)
            GameObject.remove(this.currentScene.asset);
        const index = this.currentIndex = this.tourScenes?.indexOf(scene) ?? -1;
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