import { GameObject, Behaviour, serializable } from "@needle-tools/engine";
import { LoadingScenes } from "./LoadingScenes";
import { TimelineTourManager } from "./TimelineTourManager";
import { IPointerClickHandler, PointerEventData } from "@needle-tools/engine/src/engine-components/ui/PointerEvents";

// Documentation → https://docs.needle.tools/scripting

export class SceneLoadButton extends Behaviour {

    @serializable()
    sceneToLoad: number = 0;
    
    start() {
    }

    // onPointerClick(_args: PointerEventData) {
    //     const sceneLoader = GameObject.findObjectOfType(LoadingScenes);
    //     if(!sceneLoader) return;

    //     sceneLoader.selectNext();
    // }

    loadScene(){
        const sceneLoader = GameObject.findObjectOfType(LoadingScenes);
        if(!sceneLoader) return;

        sceneLoader.loadAtIndex(this.sceneToLoad);
    }

    startTour(){
        const tourManager = GameObject.findObjectOfType(TimelineTourManager);
        if(!tourManager) return;

        tourManager.selectIndex(1);
    }




}