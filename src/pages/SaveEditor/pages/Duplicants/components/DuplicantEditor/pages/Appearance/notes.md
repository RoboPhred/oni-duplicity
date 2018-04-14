MinionStartingStats.cs

  public static KCompBuilder.BodyData CreateBodyData(Personality p)
  {
    return new KCompBuilder.BodyData()
    {
      eyes = HashCache.Get().Add(string.Format("eyes_{0:000}", (object) p.eyes)),
      hair = HashCache.Get().Add(string.Format("hair_{0:000}", (object) p.hair)),
      headShape = HashCache.Get().Add(string.Format("headshape_{0:000}", (object) p.headShape)),
      mouth = HashCache.Get().Add(string.Format("mouth_{0:000}", (object) p.mouth)),
      neck = HashCache.Get().Add(string.Format("neck_{0:000}", (object) p.neck)),
      arms = HashCache.Get().Add(string.Format("arm_{0:000}", (object) p.body)),
      body = HashCache.Get().Add(string.Format("body_{0:000}", (object) p.body)),
      hat = HashedString.Invalid,
      hatHair = HashCache.Get().Add(string.Format("hat_hair_{0:000}", (object) p.hair)),
      hairAlways = HashCache.Get().Add(string.Format("hair_{0:000}", (object) p.hair))
    };
  }

    public static KCompBuildInstance ApplyRace(GameObject go, KCompBuilder.BodyData personality)
  {
    KBatchedAnimController component = go.GetComponent<KBatchedAnimController>();
    component.ClearAnims();
    KAnimFile[] kanimFileArray = new KAnimFile[8]
    {
      Assets.GetAnim((HashedString) "body_comp_default_kanim"),
      Assets.GetAnim((HashedString) "anim_construction_default_kanim"),
      Assets.GetAnim((HashedString) "anim_emotes_default_kanim"),
      Assets.GetAnim((HashedString) "anim_idles_default_kanim"),
      Assets.GetAnim((HashedString) "anim_loco_firepole_kanim"),
      Assets.GetAnim((HashedString) "anim_loco_new_kanim"),
      Assets.GetAnim((HashedString) "anim_loco_tube_kanim"),
      Assets.GetAnim((HashedString) "anim_construction_firepole_kanim")
    };
    component.AddAnims(kanimFileArray);
    KCompBuildInstance kcompBuildInstance = new KCompBuildInstance(personality, component);
    component.UpdateSymbolLookups();
    return kcompBuildInstance;
  }