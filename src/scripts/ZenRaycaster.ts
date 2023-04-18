import {GameObject, Behaviour, serializable } from "@needle-tools/engine";
import { ZenRaycastTarget } from "./ZenRaycastTarget";

// Documentation → https://docs.needle.tools/scripting

export class ZenRaycaster extends Behaviour {
    
    currTarget? : ZenRaycastTarget;

    update() {
        if(this.currTarget)
        {
            if(this.context.input.mouseClick)
                this.currTarget.RaycastClick();
        }

        const hitCollider = this.context.physics.raycastPhysicsFast(this.context.input.getPointerPosition(0)!);
        if(!hitCollider || !hitCollider.collider.gameObject.getComponent(ZenRaycastTarget))
        {
            if(this.currTarget){
                this.currTarget.StopRaycastAction();
                this.currTarget = undefined;
            }
            return;
        }
        
        const newTarget = hitCollider.collider.gameObject.getComponent(ZenRaycastTarget);

        if(this.currTarget && this.currTarget != newTarget)
        {
            this.currTarget.StopRaycastAction();
        }

        if(newTarget && this.currTarget != newTarget)
        {
            newTarget.DoRaycastAction();
            this.currTarget = newTarget;
        }
    }
}