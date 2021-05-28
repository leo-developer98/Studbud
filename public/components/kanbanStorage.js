export default class KanbanStorage {
    constructor() {
      // if item by key `tasks` is not defined JSON.parse return null, so I use `or empty array`
      this.columns = JSON.parse(localStorage.getItem('kanban')) || [];
    }

    updateColumn(column) {
        let index = this.getIndex(column);
    
        if (index !== -1) {
          this.columns[index] = column;
    
          localStorage.setItem('kanban', JSON.stringify(this.columns));
        } else {
          console.log("Column doesn't exist in the list")
        }
    }
  
    getColumnIndex(column) {
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].id == column.id) {
          return i;
        } 
      }
      return -1;
    }

    getItemIndex(item, column) {
      let columnIndex = this.getColumnIndex(column);
      if (columnIndex === -1) {
        console.log("column doesn't exist");
      } else {
        for (let i = 0; i < this.columns[columnIndex].length; i++) {
          if (this.columns[columnIndex][i].id == item.id) {
            return i;
          } 
        }
        return -1;
      }
    }

    addItem(item, column) {
      let columnIndex = this.getColumnIndex(column);
      let itemIndex = this.getItemIndex(item, column);
      if (itemIndex !== -1 && columnIndex !== -1) {
        this.columns[columnIndex].push(item);
        this.updateColumn(column);
      } else {
        console.log("Column doesn't exist or item already exists");
      }
    }

    removeItem(item) {
      // let columnIndex = this.getColumnIndex(column);
      // let itemIndex = this.getItemIndex(item, column);
      // if (itemIndex !== -1 && columnIndex !== -1) {
      //   this.columns[columnIndex].remove(item);
      //   this.updateColumn(column);
      // } else {
      //   console.log("Column doesn't exist or item doesn't exists");
      // }
      for (let i = 0; i < this.columns.length; i++) {
        if (this.getItemIndex()) {
          return i;
        } 
      }
      return -1;
    }

    addColumn(column) {
        let index = this.getIndex(column);
    
        if (index === -1) {
          this.columns.push(column);
          localStorage.setItem('kanban', JSON.stringify(this.columns));
        } else {
          console.log("Column already exist in the list")
        }
      }
  
  
    deleteColumn(column) {
      let index = this.getIndex(column);
  
      if (index !== -1) {
        this.columns.splice(index, 1);
  
        localStorage.setItem('kanban', JSON.stringify(this.columns));
      } else {
        console.log("Column doesn't exist in the list")
      }
    }
  }