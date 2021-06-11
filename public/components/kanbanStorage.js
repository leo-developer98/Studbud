export default class KanbanStorage {
  constructor() {
    // if item by key `tasks` is not defined JSON.parse return null, so I use `or empty array`
    this.boards = JSON.parse(localStorage.getItem('kanban')) || [{ id: 'toDo', title: "To Do", items: [], color: "#178bff", order: 1},
    { id: 'inProgress', title: "In Progress", items: [], color: "#ffc31e", order: 2},
    { id: 'done', title: "Done", items: [], color: "#3dd66b", order: 3} ];
  }

  getColumnIndex(boardId) {
    for (let i = 0; i < this.boards.length; i++) {
      if (this.boards[i].id == boardId) {
        return i;
      }
    }
    return -1;
  }

  // returns the item index with a list of [columnIndex, itemIndex] in this.columns
  getItemIndex(itemId, columnIndex) {
    if (columnIndex !== -1) {
      for (let i = 0; i < this.boards[columnIndex].items.length; i++) {
        if (this.boards[columnIndex].items[i].id == itemId) {
          return i;
        }
      }
      return -1;
    }
  }

  getItemObject(itemId) {
    for (let i=0;i<this.boards.length;i++) {
      for (let j=0; j< this.boards[i].items.length;j++) {
        if (this.boards[i].items[j].id == itemId) {
          return this.boards[i].items[j]
        } else {
          console.log("KanbanStorage.getItemObject(): item not found in the storage")
        }
      }
    }
    // alert("no item object found in Kanban Storage");
    // return false
  }

  getBoardObject(boardId) {
    for (let i=0;i<this.boards.length;i++) {
      if (this.boards[i].id == boardId) {
        return this.boards[i];
      } else {
        console.log("KanbanStorage.getBoardObject(): board not found in the storage")
      }
    }
  }

  addBoard(board) {
    let index = this.getColumnIndex(board.id);

    if (index === -1) {
      this.boards.push(board);
      localStorage.setItem('kanban', JSON.stringify(this.boards));
      // let newOption = document.createElement("option");
      // newOption.innerHTML = board.title;
      // newOption.setAttribute("value", board.id);
      // newOption.classList.add("kanban-" + board.title, "kanban-options");
      // $(".kanban-select").append($(newOption));
    } else {
      console.log("Kanban Storage(addBoard): Board already exist in the KanbanStorage.boards");
    }
  }

  removeBoard(boardId) {
    let index = this.getColumnIndex(boardId);

    if (index !== -1) {
      this.boards.splice(index, 1);
      // let option = $(".kanban-" + boardId);
      // $(option).remove();

      localStorage.setItem('kanban', JSON.stringify(this.boards));
    } else {
      console.log("Kanban Storage(removeBoard): Board doesn't exist in the KanbanStorage.boards");
    }
  }

  addItem(item, boardId) {
    let columnIndex = this.getColumnIndex(boardId);
    let itemIndex = this.getItemIndex(item.id, columnIndex);

    if (itemIndex == -1 && columnIndex !== -1) {
      this.boards[columnIndex].items.push(item);

      let button = $(`.kanban-select[data-item="${item.id}"]`);
      // console.log(button);
      localStorage.setItem('kanban', JSON.stringify(this.boards));
    } else {
      console.log(`Kanban Storage(addItem): Item wasn't added due to invalid index, columnIndex=${columnIndex} itemIndex=${itemIndex}`);
    }
  }

  removeItem(itemId, boardId) {
    let columnIndex = this.getColumnIndex(boardId);
    let itemIndex = this.getItemIndex(itemId, columnIndex);

    if (itemIndex !== -1 && columnIndex !== -1) {
      this.boards[columnIndex].items.splice(itemIndex, 1);
      // this.boards[columnIndex].items.remove(itemIndex, 1);
      localStorage.setItem('kanban', JSON.stringify(this.boards));
    } else {
      // alert("Kanban Storage(removeItem): Item wasn't removed due to invalid index");
    }
  }

  removeItemAll(itemId) {
    for (let i = 0; i < this.boards.length; i++) {
      for (let j = 0; j < this.boards[i].items.length; j++) {
        if (this.boards[i].items[j].id == itemId) {
          this.boards[i].items.splice(j, 1);
        }
      }
    }
  }
  
  sortBoards() {
    this.boards.sort((a,b) => a.order - b.order);
    localStorage.setItem('kanban', JSON.stringify(this.boards));
  }

  updateBoardOrder(boardId, order) {
    let colIndex = this.getColumnIndex(boardId);
    if (colIndex !== -1) {
      this.boards[colIndex].order = order;
      localStorage.setItem('kanban', JSON.stringify(this.boards));
    }
  }
}