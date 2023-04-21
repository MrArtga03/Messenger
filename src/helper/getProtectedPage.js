import RequireAuth from "../hoc/RequireAuth"

export const getProtectedPage = (page) => {
  return <RequireAuth>{page}</RequireAuth>
}