function setData(key: string, data: string): void {
    localStorage.setItem(key, data)
}

function getData(key: string): string {
    const data = localStorage.getItem(key)
    return data ?? ''
}

function removeData(key: string): void {
    localStorage.removeItem(key)
}

function clearData(): void {
    localStorage.clear()
}

export const ls = {
    setData,
    getData,
    removeData,
    clearData
}