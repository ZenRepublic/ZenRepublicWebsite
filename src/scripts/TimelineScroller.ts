import { Behaviour, PlayableDirector, serializable } from "@needle-tools/engine";
import { Mathf } from "@needle-tools/engine/src/engine/engine_math";

// Documentation → https://docs.needle.tools/scripting

export class TimelineScroller extends Behaviour {

    @serializable(PlayableDirector)
    timeline?: PlayableDirector;

    @serializable()
    startOffset: number = 0;

    @serializable()
    lerpSpeed: number = 2.5;

    private targetTime: number = 0;

    start() {
        window.addEventListener("wheel", (evt: WheelEvent) => this.updateTime(evt.deltaY));
        let lastTouchPosition = -1;
        window.addEventListener("touchmove", (evt: TouchEvent) => {
            if (lastTouchPosition === -1) {
                lastTouchPosition = evt.touches[0].clientY;
            }
            const delta = evt.touches[0].clientY - lastTouchPosition;
            if (delta < 10) {
                this.updateTime(-delta);
            }
            lastTouchPosition = evt.touches[0].clientY;
        });
    }

    onEnable(): void {
        this.resetTimeline();
    }

    private updateTime(delta) {
        if (!this.timeline) return;
        this.targetTime += delta * 0.001;
        this.targetTime = Mathf.clamp(this.targetTime, 0, this.timeline.duration);
    }

    onBeforeRender(): void {
        if (!this.timeline) return;
        this.timeline.pause();
        this.timeline.time = Mathf.lerp(this.timeline.time, this.targetTime, this.lerpSpeed * this.context.time.deltaTime);
        this.timeline.evaluate();
    }

    resetTimeline(){
        if(!this.timeline)return;
        this.timeline.time=0;
        this.targetTime=0;
    }
}