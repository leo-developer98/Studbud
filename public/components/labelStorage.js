export default class LabelStorage {
    constructor() {
      // if item by key `tasks` is not defined, is empty array
      this.labels = JSON.parse(localStorage.getItem('labels')) || [];
    }
  
    // Creates a new label and updates the Local Storage
    create(label, name, colour) {
      label.name = name;
      label.colour = colour;
      label.links = [];

      let index = this.getIndex(label);
      if (index === -1) {
        this.labels.push(label);
        localStorage.setItem('labels', JSON.stringify(this.labels));
      } else {
        console.log("Label already exist in the list")
      }
    } 
    
    // returns the index of the label using label.name || returns -1 when not found
    getIndex(label) {
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].name == label.name) {
          return i;
        } 
      }
      return -1;
    }

    // returns the label's color if the lable name exists
    getColour(name) {
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].name == name) {
          return this.labels[i].colour.toString();
        } 
      }
      console.log("cannot find the label: " + name.toString());
    }

    // returns boolean value whether lable exists by colour
    labelColourExists(label) {
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].colour == label.colour) {
          // alert("Label colour already exists");
          return true;
        }
      }
      return false;
    }

    // returns boolean value whether label exists by name
    labelNameExists(label) {
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].name == label.name) {
          // alert("Label name already exists");
          return true;
        }
      }
      return false;
    }
    
    // updates the label in the storage
    update(label) { 
      let index = this.getIndex(label);

      if (index !== -1) {
        this.labels[index] = label;
        localStorage.setItem('labels', JSON.stringify(this.labels));
      } else {
        console.log("Label doesn't exist in the list")
      }
    }
    
    // deletes label from the storage
    delete(label) {
      let index = this.getIndex(label);
      if (index !== -1) {
        this.labels.splice(index, 1);
        localStorage.setItem('labels', JSON.stringify(this.labels));
      } else {
        console.log("Label doesn't exist in the list")
      }
    }
  }