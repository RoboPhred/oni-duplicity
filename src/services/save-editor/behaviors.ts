
import {
    GameObject,
    GameObjectBehavior
} from "oni-save-parser";

export type BehaviorName<T extends GameObjectBehavior> = string & { __behaviorTypeMetadata?: T & never };


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
        name: string;
        nameStringKey: string;

        gender: "MALE" | "FEMALE" | "NB";
        genderStringKey: "MALE" | "FEMALE" | "NB";

        arrivalTime: number;

        voiceIdx: number;

        bodyData: {
            headShape: {
                hash: number;
            },
            mouth: {
                hash: number;
            },
            neck: {
                hash: number;
            },
            eyes: {
                hash: number;
            },
            hair: {
                hash: number;
            },
            body: {
                hash: number;
            },
            arms: {
                hash: number;
            },
            hat: {
                hash: number;
            },
            hatHair: {
                hash: number;
            },
            hairAlways: {
                hash: number;
            }
        };
    };
}

export const AccessorizerBehavior: BehaviorName<AccessorizerBehavior> = "Accessorizer";
export interface Accessory {
    guid: {
        /**
         * Note: Not an actual guid!  This is a string name of a nested resource,
         * such as ```Root.Accessories.eyes_003```.
         */
        Guid: string;
    }
};
export interface AccessorizerBehavior extends GameObjectBehavior {
    name: "Accessorizer",
    parsedData: {
        accessories: Accessory[];
    };
}


export const MinionResumeBehavior: BehaviorName<MinionResumeBehavior> = "MinionResume";
export interface MinionResumeBehavior extends GameObjectBehavior {
    name: "MinionResume";
    parsedData: {
        ExperienceByRoleID: Map<string, number>;
        MasteryByRoleID: Map<string, boolean>;
        AptitudeByRoleGroup: Map<{hash: number}, number>;

        currentRole: string;
        targetRole: string;
    };
}


export const AIAttributeLevelsBehavior: BehaviorName<AIAttributeLevelsBehavior> = "Klei.AI.AttributeLevels";
export interface AIAttributeLevelsBehavior extends GameObjectBehavior {
    name: "Klei.AI.AttributeLevels";
    parsedData: {
        saveLoadLevels: AttributeLevel[];
    };
}
export interface AttributeLevel {
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