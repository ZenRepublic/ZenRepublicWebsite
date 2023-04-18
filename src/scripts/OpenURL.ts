import { Behaviour, isSafari, serializable } from "@needle-tools/engine";
import { IPointerClickHandler, PointerEventData } from "@needle-tools/engine/src/engine-components/ui/PointerEvents";

export class OpenURL extends Behaviour implements IPointerClickHandler {

    @serializable()
    urlLink : string = "";

    start(): void {
    }

    // Make sure to have an ObjectRaycaster component in the parent hierarchy
    onPointerClick(_args: PointerEventData) {
        if(isSafari())
        {
            window.open(this.urlLink, '_self');
        }
        else
        {
            window.open(this.urlLink, '_blank');
        }
    }

    openURLManual() {
        if(isSafari())
        {
            window.open(this.urlLink, '_self');
        }
        else
        {
            window.open(this.urlLink, '_blank');
        }
    }
}