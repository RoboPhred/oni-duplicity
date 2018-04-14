RoleManager.cs






public Dictionary<HashedString, RoleGroup> RoleGroups = new Dictionary<HashedString, RoleGroup>()
  {
    {
      (HashedString) "Farming",
      new RoleGroup((HashedString) "Farming", "Farming", (string) DUPLICANTS.CHOREGROUPS.FARMING.NAME)
    },
    {
      (HashedString) "Ranching",
      new RoleGroup((HashedString) "Ranching", "Ranching", (string) DUPLICANTS.CHOREGROUPS.RANCHING.NAME)
    },
    {
      (HashedString) "Mining",
      new RoleGroup((HashedString) "Mining", "Dig", (string) DUPLICANTS.CHOREGROUPS.DIG.NAME)
    },
    {
      (HashedString) "Cooking",
      new RoleGroup((HashedString) "Cooking", "Cook", (string) DUPLICANTS.CHOREGROUPS.COOK.NAME)
    },
    {
      (HashedString) "Art",
      new RoleGroup((HashedString) "Art", "Art", (string) DUPLICANTS.CHOREGROUPS.ART.NAME)
    },
    {
      (HashedString) "Building",
      new RoleGroup((HashedString) "Building", "Build", (string) DUPLICANTS.CHOREGROUPS.BUILD.NAME)
    },
    {
      (HashedString) "Management",
      new RoleGroup((HashedString) "Management", string.Empty, string.Empty)
    },
    {
      (HashedString) "Research",
      new RoleGroup((HashedString) "Research", "Research", (string) DUPLICANTS.CHOREGROUPS.RESEARCH.NAME)
    },
    {
      (HashedString) "Suits",
      new RoleGroup((HashedString) "Suits", string.Empty, string.Empty)
    },
    {
      (HashedString) "Hauling",
      new RoleGroup((HashedString) "Hauling", "Hauling", (string) DUPLICANTS.CHOREGROUPS.HAULING.NAME)
    },
    {
      (HashedString) "Technicals",
      new RoleGroup((HashedString) "Technicals", "MachineOperating", (string) DUPLICANTS.CHOREGROUPS.MACHINEOPERATING.NAME)
    },
    {
      (HashedString) "MedicalAid",
      new RoleGroup((HashedString) "Doctor", "MedicalAid", (string) DUPLICANTS.CHOREGROUPS.MEDICALAID.NAME)
    },
    {
      (HashedString) "Basekeeping",
      new RoleGroup((HashedString) "Basekeeping", "Basekeeping", (string) DUPLICANTS.CHOREGROUPS.BASEKEEPING.NAME)
    }

      new Tuple<string, int>("NoRole", 128),
      new Tuple<string, int>(JuniorMiner.ID, 128),
      new Tuple<string, int>(Miner.ID, 128),
      new Tuple<string, int>(SeniorMiner.ID, 128),
      new Tuple<string, int>("JuniorFarmer", 128),
      new Tuple<string, int>("Farmer", 128),
      new Tuple<string, int>("SeniorFarmer", 128),
      new Tuple<string, int>("Rancher", 128),
      new Tuple<string, int>("SeniorRancher", 128),
      new Tuple<string, int>(JuniorResearcher.ID, 128),
      new Tuple<string, int>(Researcher.ID, 128),
      new Tuple<string, int>(SeniorResearcher.ID, 128),
      new Tuple<string, int>("Hauler", 128),
      new Tuple<string, int>(JuniorBuilder.ID, 128),
      new Tuple<string, int>(Builder.ID, 128),
      new Tuple<string, int>(SeniorBuilder.ID, 128),
      new Tuple<string, int>(JuniorCook.ID, 128),
      new Tuple<string, int>(Cook.ID, 128),
      new Tuple<string, int>(MachineTechnician.ID, 128),
      new Tuple<string, int>(JuniorArtist.ID, 128),
      new Tuple<string, int>(Artist.ID, 128),
      new Tuple<string, int>(Handyman.ID, 128),
      new Tuple<string, int>("SuitExpert", 128),
      new Tuple<string, int>("OilTechnician", 128),
      new Tuple<string, int>("PowerTechnician", 128),
      new Tuple<string, int>(MaterialsManager.ID, 128),
      new Tuple<string, int>("MechatronicEngineer", 128)






       public static Dictionary<string, string> roleHatIndex = new Dictionary<string, string>()
  {
    {
      "JuniorFarmer",
      "hat_role_farming1"
    },
    {
      "Farmer",
      "hat_role_farming2"
    },
    {
      "SeniorFarmer",
      "hat_role_farming3"
    },
    {
      "Rancher",
      "hat_role_rancher1"
    },
    {
      "SeniorRancher",
      "hat_role_rancher2"
    },
    {
      JuniorResearcher.ID,
      "hat_role_research1"
    },
    {
      Researcher.ID,
      "hat_role_research2"
    },
    {
      SeniorResearcher.ID,
      "hat_role_research3"
    },
    {
      JuniorMiner.ID,
      "hat_role_mining1"
    },
    {
      Miner.ID,
      "hat_role_mining2"
    },
    {
      SeniorMiner.ID,
      "hat_role_mining3"
    },
    {
      JuniorCook.ID,
      "hat_role_cooking1"
    },
    {
      Cook.ID,
      "hat_role_cooking2"
    },
    {
      JuniorArtist.ID,
      "hat_role_art1"
    },
    {
      Artist.ID,
      "hat_role_art2"
    },
    {
      "Hauler",
      "hat_role_hauling1"
    },
    {
      MaterialsManager.ID,
      "hat_role_hauling2"
    },
    {
      "SuitExpert",
      "hat_role_suits1"
    },
    {
      MachineTechnician.ID,
      "hat_role_technicals1"
    },
    {
      "PowerTechnician",
      "hat_role_technicals2"
    },
    {
      "MechatronicEngineer",
      "hat_role_engineering1"
    },
    {
      JuniorBuilder.ID,
      "hat_role_building1"
    },
    {
      Builder.ID,
      "hat_role_building2"
    },
    {
      SeniorBuilder.ID,
      "hat_role_building3"
    },
    {
      Handyman.ID,
      "hat_role_basekeeping1"
    }
  };



      List<List<RoleConfig>> roleConfigListList = new List<List<RoleConfig>>()
    {
      new List<RoleConfig>() { (RoleConfig) new NoRole() },
      new List<RoleConfig>()
      {
        (RoleConfig) new Hauler(),
        (RoleConfig) new JuniorMiner(),
        (RoleConfig) new JuniorBuilder()
      },
      new List<RoleConfig>()
      {
        (RoleConfig) new JuniorFarmer(),
        (RoleConfig) new JuniorResearcher(),
        (RoleConfig) new JuniorCook(),
        (RoleConfig) new JuniorArtist(),
        (RoleConfig) new MachineTechnician(),
        (RoleConfig) new Handyman()
      },
      new List<RoleConfig>()
      {
        (RoleConfig) new Miner(),
        (RoleConfig) new Builder(),
        (RoleConfig) new MaterialsManager()
      },
      new List<RoleConfig>()
      {
        (RoleConfig) new Farmer(),
        (RoleConfig) new Rancher(),
        (RoleConfig) new Researcher(),
        (RoleConfig) new Cook(),
        (RoleConfig) new Artist(),
        (RoleConfig) new PowerTechnician()
      },
      new List<RoleConfig>()
      {
        (RoleConfig) new MechatronicEngineer(),
        (RoleConfig) new SeniorMiner(),
        (RoleConfig) new SeniorBuilder()
      },
      new List<RoleConfig>()
      {
        (RoleConfig) new SeniorResearcher(),
        (RoleConfig) new SeniorFarmer(),
        (RoleConfig) new SeniorRancher(),
        (RoleConfig) new SuitExpert()
      }
    };