export class KeyValue<T_Key, T_Value> {
  // ======================================= //
  public key  : T_Key  ;
  public value: T_Value;
  // ======================================= //
  constructor(key?: T_Key, value?: T_Value) {
    this.key   = key  ;
    this.value = value;
  }
}
