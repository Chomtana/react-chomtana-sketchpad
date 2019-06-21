import Ref from "./Ref";

export default class RefContainer {
  [prop: string]: any;

  /**
   * Create new RefContainer, either empty container or extract PassedRef from some object in form {refname: PassedRef,...} (can contains anything more other than Ref, it will only extract parameter that are refs)
   *
   * Often use without *input* argument
   *
   * OR *input* argument = **params**
   *
   * @param input often; **params**; anything that contains {refname: PassedRef,...} (can contains anything more other than Ref, it will only extract parameter that are refs)
   */
  constructor(input?: any) {
    if (input) {
      try {
        for (var key in input) {
          //if (input[key][1] is Ref or extends Ref)
          this[key] = input[key];
        }
      } catch (err) {
        console.log("Cannot build RefContainer: ", err);
      }
    }
  }
}
