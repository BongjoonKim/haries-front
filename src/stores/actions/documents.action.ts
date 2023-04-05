export const DocumentConstants = {
  SAVE : "save",
  SAVE_AS : "saveAs"
}

export const DocumentActions = {
  save(params : DocumentsDTO) {
    return {type : DocumentConstants.SAVE, payload: params}
  },
  saveAs(params: DocumentsDTO) {
    return {type: DocumentConstants.SAVE_AS, payload: params}
  }
}

export type ActionTypes =
  | ReturnType<typeof DocumentActions.save>
  | ReturnType<typeof DocumentActions.saveAs>;