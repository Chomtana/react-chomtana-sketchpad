import { cloneDeep } from "lodash";

//Credit: https://stackoverflow.com/questions/36871299/how-to-extend-function-with-es6-classes
class ExtensibleFunction extends Function {
  constructor(f) {
    super();
    return Object.setPrototypeOf(f, new.target.prototype);
  }
}

/*export type PassedRef<Target = any, Value = any> = [Target, typeof Ref, Value];

export function isExtendsRef(x: any): Boolean {
  return x === Ref || x.prototype instanceof Ref;
}

//we cannot check deeper information, it is language limitation
export function isPassedRef(x: any): x is PassedRef {
  if (!Array.isArray(x)) return false;
  if (x.length != 3) return false;
  if (!isExtendsRef(x[1])) return false;
  return true;
}*/

export default abstract class Ref extends ExtensibleFunction {
  protected target: any;

  public get value(): any {
    return this.get();
  }
  public set value(newvalue: any) {
    this.set(newvalue);
  }

  public get current(): any {
    return this.getCurrent();
  }
  public set current(newvalue: any) {
    this.stage(newvalue);
  }

  constructor(input?: any) {
    super((query?: any) => {
      if (typeof query !== "undefined") {
        return this.performNext(query);
      } else {
        return this.get();
      }
    });

    //default is target = input
    //so that we can use constructor to make new ref
    if (Array.isArray(input)) {
      this.target = input[0];
    } else {
      this.target = input;
    }
  }

  public getTarget() {
    return this.target;
  }

  protected abstract performNext(query: any);

  public abstract get(): any;
  public set(newvalue: any) {
    this.stage(newvalue);
    this.commit();
  }

  public abstract getCurrent(): any;
  public abstract stage(newvalue: any);

  public abstract commit(message?: any, path?: string);

  /**
   * Reset current value to last commit
   */
  public reset() {
    this.stage(this.get());
  }

  public makeNotExtension(): Ref {
    return this;
  }

  //Array Helper functions
  private perform_array_helper(
    getfn: Function,
    setfn: Function,
    arrayfn: Function,
    ...x
  ) {
    if (Array.isArray(getfn.call(this))) {
      var newarray = cloneDeep(getfn.call(this));
      var callreturn = arrayfn.call(newarray, ...x);
      this.set(newarray);
      return callreturn;
    }
    throw new Error("Not an array");
  }

  public push(...x): number {
    return this.perform_array_helper(
      this.get,
      this.set,
      Array.prototype.push,
      ...x
    );
  }

  public pop(x?: number): any {
    if (typeof x === "undefined") {
      return this.perform_array_helper(this.get, this.set, Array.prototype.pop);
    } else {
      return this.perform_array_helper(
        this.get,
        this.set,
        Array.prototype.slice,
        x,
        1
      );
    }
  }
}

export abstract class RefExtension extends Ref {
  public abstract makeNotExtension(): Ref;
}
