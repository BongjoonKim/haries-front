export const DocumentConstants = {
  SAVE : "save",
  SAVE_AS : "saveAs",
  INITIALIZE : "initialsize",
}

export const DocumentActions = {
  initialize() {
    return {type: DocumentConstants.INITIALIZE}
  },
  save(params : DocumentDTO) {
    return {type : DocumentConstants.SAVE, payload: params}
  },
  saveAs(params: DocumentDTO) {
    return {type: DocumentConstants.SAVE_AS, payload: params}
  }
}

export type ActionTypes =
  | ReturnType<typeof DocumentActions.save>
  | ReturnType<typeof DocumentActions.saveAs>;