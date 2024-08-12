class PaxHelper {
  static paxMixValue = null;
  static ADULT = null;
  static YOUNGADULT = null;
  static CHILD = null;
  static INFANT = null;

  static async splitPaxMixType(paxmixType) {
      const pax = paxmixType.split(",");
      for (let i = 0; i < pax.length; i++) {
          switch (pax[i].substr(1, 1)) {
              case "A":
                  PaxHelper.ADULT = parseInt(pax[i].substr(0, 1));
                  break;
              case "Y":
                  PaxHelper.YOUNGADULT = parseInt(pax[i].substr(0, 1));
                  break;
              case "I":
                  PaxHelper.INFANT = parseInt(pax[i].substr(0, 1));
                  break;
              case "C":
                  PaxHelper.CHILD = parseInt(pax[i].substr(0, 1));
                  break;
              default:
                  PaxHelper.ADULT = 1;
                  PaxHelper.YOUNGADULT = 0;
                  PaxHelper.CHILD = 0;
                  PaxHelper.INFANT = 0;
                  break;
          }
      }
      PaxHelper.paxMixValue = paxmixType;
  }

  static get getNumOfAdults() {
      return PaxHelper.ADULT;
  }
  static get getNumOfYoungAdults() {
      return PaxHelper.YOUNGADULT;
  }
  static get getNumOfChildren() {
      return PaxHelper.CHILD;
  }
  static get getNumOfInfants() {
      return PaxHelper.INFANT;
  }

  static async getTotalPaxCount() {
      let totalPax = parseInt(PaxHelper.ADULT || 0) +
          parseInt(PaxHelper.YOUNGADULT || 0) +
          parseInt(PaxHelper.CHILD || 0) +
          parseInt(PaxHelper.INFANT || 0);
      return totalPax;
  }
}

module.exports = PaxHelper;
