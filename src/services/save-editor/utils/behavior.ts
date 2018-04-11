
import {
    GameObject,
    GameObjectBehavior
} from "oni-save-parser";

export type BehaviorName<T> = string & { __behaviorTypeMetadata?: T & never};


export interface AttributeLevelBehavior extends GameObjectBehavior {
    parsedData: {
        saveLoadLevels: AttributeSaveLoadLevel[];
    };
}
export interface AttributeSaveLoadLevel {
    attributeId: string;
    experience: number;
    level: number;
}
export const AttributeLevelBehavior: BehaviorName<AttributeLevelBehavior> = "Klei.AI.AttributeLevels";


export interface MinionIdentityBehavior extends GameObjectBehavior {
    parsedData: {
        arrivalTime: number;
        bodyShape: any;
        gender: "MALE" | "FEMALE";
        genderStringKey: "MALE" | "FEMALE";
        name: string;
        nameStringKey: string;
    }
}
export const MinionIdentityBehavior: BehaviorName<MinionIdentityBehavior> = "MinionIdentity";


export interface MinionResumeBehavior extends GameObjectBehavior {
    parsedData: {
        ExperienceByRoleID: [string, number][];
        MasteryByRoleID: [string, boolean][];
        AptitudeByRoleGroup: [{hash: number}, number][];
        currentRole: string;
        targetRole: string;
    }
}
export const MinionResumeBehavior: BehaviorName<MinionResumeBehavior> = "MinionResume";


export interface MinionTraitBehavior extends GameObjectBehavior {
    parsedData: {
        TraitIds: string[];
    }
}
export const MinionTraitBehavior: BehaviorName<MinionTraitBehavior> = "Klei.AI.Traits";


export interface MinionEffectsBehavior extends GameObjectBehavior {
    parsedData: {
        saveLoadEffects: EffectInstance[]
    }
}
export interface EffectInstance {
    id: string;
    timeRemaining: number;
}
export const MinionEffectsBehavior: BehaviorName<MinionEffectsBehavior> = "Klei.AI.Effects";


export interface MinionHealthBehavior extends GameObjectBehavior {
    parsedData: {
        CanBeIncapacitated: boolean;
        State: number;
    }
}
export const MinionHealthBehavior: BehaviorName<MinionHealthBehavior> = "Health";


export function getBehavior<T>(gameObject: GameObject, name: BehaviorName<T>): T | undefined {
    return gameObject.behaviors.find(x => x.name === name) as T | undefined;
}