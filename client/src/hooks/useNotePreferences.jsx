import { useState } from "react"

const useNotePreferences = () => {
    const [sortCriteria, setSortCriteria] = useState(localStorage.getItem("sortCritria") || "updatedAt")
    const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || -1)
    const [gridLayout, setGridLayout] = useState(localStorage.getItem("gridLayout") && true)
  
    const handleSortCriteria = (criteria) => {
        setSortCriteria(criteria)
        localStorage.setItem("sortCritria", criteria)
      }
    
      const handleSortBy = (by) => {
        setSortBy(by)
        localStorage.setItem("sortBy", by)
      }
    
      const handleLayout = (layout) => {
        setGridLayout(layout)
        localStorage.setItem("gridLayout", layout === true ? layout : "")
      }
      
  return { handleSortCriteria, sortCriteria, handleSortBy, sortBy, handleLayout, gridLayout }
}

export default useNotePreferences
