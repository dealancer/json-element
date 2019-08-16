class SharedStyles {
  static get styles() {
    return this._styles;
  }

  static set styles(styles) {
    this._styles = styles;
  }
}

export default SharedStyles;
