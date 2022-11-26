import { createOneHistoryRecord } from './create-one-record/controller'
import { createOneHistoryRecordValidators } from './create-one-record/validators'
import { deleteOneHistoryRecord } from './delete-one-record/controller'
import { deleteOneHistoryRecordValidators } from './delete-one-record/validators'
import { getHistory } from './get-history/controller'
import { getHistoryValidators } from './get-history/validators'

export const historyRoutes = {
  getAll: [getHistoryValidators, getHistory],
  deleteOne: [deleteOneHistoryRecordValidators, deleteOneHistoryRecord],
  createOne: [createOneHistoryRecordValidators, createOneHistoryRecord]
}
