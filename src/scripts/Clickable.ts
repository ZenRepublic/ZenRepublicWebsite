import { Behaviour, serializable, EventList, IPointerClickHandler,  PointerEventData } from "@needle-tools/engine";

// Documentation → https://docs.needle.tools/scripting

export class Clickable extends Behaviour implements IPointerClickHandler{
    
    @serializable(EventList)
    onClicked? : EventList;

    start() {
    }

    onPointerClick(_args: PointerEventData) {
        console.log("Clicked", this.name);
        this.onClicked?.invoke();
    }
}