export default class Section {
  constructor ({items, renderer}, container){
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = container;
  }
  renderItems(){
    this._itemsArray.forEach(item => {
      this._renderer(item);
    });
  }
  addItem(item){
    this._container.append(item);
  }
}