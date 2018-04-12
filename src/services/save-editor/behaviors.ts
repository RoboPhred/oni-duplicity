
import {
    GameObject,
    GameObjectBehavior
} from "oni-save-parser";

export type BehaviorName<T extends GameObjectBehavior> = string & { __behaviorTypeMetadata?: T & never};


export const KPrefabIDBehavior: BehaviorName<KPrefabIDBehavior> = "KPrefabID";
export interface KPrefabIDBehavior extends GameObjectBehavior {
    name: "KPrefabID";
    parsedData: {
        InstanceID: number;
    };
}


export const MinionIdentityBehavior: BehaviorName<MinionIdentityBehavior> = "MinionIdentity";
export interface MinionIdentityBehavior extends GameObjectBehavior {
    name: "MinionIdentity";
    parsedData: {
        arrivalTime: number;
        bodyShape: any;
        gender: "MALE" | "FEMALE";
        genderStringKey: "MALE" | "FEMALE";
        name: string;
        nameStringKey: string;
    };
}


export const MinionResumeBehavior: BehaviorName<MinionResumeBehavior> = "MinionResume";
export interface MinionResumeBehavior extends GameObjectBehavior {
    name: "MinionResume";
    parsedData: {
        ExperienceByRoleID: [string, number][];
        MasteryByRoleID: [string, boolean][];
        AptitudeByRoleGroup: [{hash: number}, number][];
        currentRole: string;
        targetRole: string;
    };
}


export const AIAttributeLevelsBehavior: BehaviorName<AIAttributeLevelsBehavior> = "Klei.AI.AttributeLevels";
export interface AIAttributeLevelsBehavior extends GameObjectBehavior {
    name: "Klei.AI.AttributeLevels";
    parsedData: {
        saveLoadLevels: AttributeSaveLoadLevel[];
    };
}
export interface AttributeSaveLoadLevel {
    attributeId: string;
    experience: number;
    level: number;
}


export const AITraitsBehavior: BehaviorName<AITraitsBehavior> = "Klei.AI.Traits";
export interface AITraitsBehavior extends GameObjectBehavior {
    name: "Klei.AI.Traits";
    parsedData: {
        TraitIds: string[];
    };
}


export const AIEffectsBehavior: BehaviorName<AIEffectsBehavior> = "Klei.AI.Effects";
export interface AIEffectsBehavior extends GameObjectBehavior {
    name: "Klei.AI.Effects";
    parsedData: {
        saveLoadEffects: EffectInstance[]
    }
}
export interface EffectInstance {
    id: string;
    timeRemaining: number;
}


export const HealthBehavior: BehaviorName<HealthBehavior> = "Health";
export interface HealthBehavior extends GameObjectBehavior {
    name: "Health";
    parsedData: {
        CanBeIncapacitated: boolean;
        State: number;
    };
}


export type KnownBehavior = 
    KPrefabIDBehavior
    | MinionIdentityBehavior
    | MinionResumeBehavior
    | AIAttributeLevelsBehavior
    | AITraitsBehavior
    | HealthBehavior;
export type KnownBehaviorName = KnownBehavior["name"]

export function getBehavior<T extends GameObjectBehavior>(gameObject: GameObject, name: BehaviorName<T>): T | undefined {
    return gameObject.behaviors.find(x => x.name === name) as T | undefined;
}