function hash(key, arrayLength) {
  let total = 0;
  let prime = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * prime + value) % arrayLength;
  }
  return total;
}

class HashTable {
  constructor(size = 5) {
    this.keyMap = new Array(size);
  }
  _hash(key) {
    return hash(key, this.keyMap.length);
  }
  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
    return index;
  }
  get(key) {
    let index = this._hash(key);

    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          console.log(
            "|KEY|   :",
            key,
            "\n|VALUE| :",
            this.keyMap[index][i][1],
            "\n"
          );
          return this.keyMap[index][i][1];
        }
      }
    }

    return undefined;
  }
  values() {
    let valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    console.log(" all the values :", valuesArr, "\n");
    return valuesArr;
  }
  keys() {
    let valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][0])) {
            valuesArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    console.log(" all the values :", valuesArr, "\n");
    return valuesArr;
  }
  print() {
    console.log(this.keyMap);
  }
}

let ht = new HashTable();
ht.set("hello", 24);
ht.set("hello", 24);
ht.set("hello", 24);
ht.set("okay", 24);
ht.set("234", 2345);
ht.set("hw", 364);
ht.set("sg", 2);
ht.keys();
ht.get("hello");
ht.values();

ht.print();
