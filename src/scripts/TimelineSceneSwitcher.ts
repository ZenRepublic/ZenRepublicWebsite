import { GameObject, Behaviour, serializable, PlayableDirector } from "@needle-tools/engine";
import { LoadingScenes } from "./LoadingScenes";
import { TimelineScroller } from "./TimelineScroller";
import { TimelineTourManager } from "./TimelineTourManager";

// Documentation → https://docs.needle.tools/scripting

export class TimelineSceneSwitcher extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    sceneLoader?: LoadingScenes = undefined;
    tourManager?: TimelineTourManager = undefined;

    scrolled?: boolean = false;
    sceneLoadOffset?: number = 0.4;

    isTour?: boolean = false;
    sceneToLoad?: number = 0;

    start(): void {
        const loader = GameObject.findObjectOfType(LoadingScenes);
        if(!loader) return;
        this.sceneLoader = loader;

        const tour = GameObject.findObjectOfType(TimelineTourManager);
        if(!tour) return;
        this.tourManager = tour;

        this.scrolled=false;
    }

    onBeforeRender(): void {
        if (!this.timeline) return;

        if(this.timeline.time > 1)
        {
            this.scrolled=true;
        }

        if(!this.sceneLoadOffset || this.sceneToLoad == undefined) return;

        if(this.timeline.time < this.sceneLoadOffset && this.scrolled)
        {
            if(this.isTour)
                this.tourManager?.selectPrev();
            else
                this.sceneLoader?.loadAtIndex(this.sceneToLoad);
            this.scrolled=false;
        }
        else if(this.timeline.time > this.timeline.duration-this.sceneLoadOffset)
        {
            if(this.isTour)
                this.tourManager?.selectNext();
            else
                this.sceneLoader?.loadAtIndex(this.sceneToLoad);
            this.scrolled=false;
        }
    }
}