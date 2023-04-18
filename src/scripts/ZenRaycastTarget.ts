import { Behaviour, serializable, EventList, IPointerClickHandler,  PointerEventData } from "@needle-tools/engine";

// Documentation → https://docs.needle.tools/scripting

export class ZenRaycastTarget extends Behaviour{
    
    @serializable(EventList)
    onRaycastEnter? : EventList;
    @serializable(EventList)
    onRaycastExit? :EventList;
    @serializable(EventList)
    onRaycastClick? :EventList;

    start() {
    }

    DoRaycastAction() {
        this.onRaycastEnter?.invoke();
    }

    StopRaycastAction() {
        this.onRaycastExit?.invoke();
    }

    RaycastClick() {
        this.onRaycastClick?.invoke();
    }
}