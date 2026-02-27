
import { ls } from "@/lib/localstorage"
import { libertyCore } from "liberty-core"
import { useRef } from "react"

export const useLibertyCoreStore = () => {
    const passwordRef = useRef('')
    const hasReg = ls.getData('LibertyStore') !== ''


    const getSalt = () => {
        return ls.getData('salt')
    }

    const getResetPassHash = () => {
        return ls.getData('resetPassHash')
    }

    const derivePassword = (pass: string) => {
        const hashpass = libertyCore.crypto.deriveKey(pass, getSalt())
        passwordRef.current = hashpass
        return hashpass
    }
    const deleteAllData = () => {
        ls.removeData('salt')
        ls.removeData('resetPassHash')
        ls.removeData('LibertyStore')
    }

    const getHash = (str: string) => {
        return libertyCore.crypto.hash(str)
    }

    const getStoreData = () => {
        return libertyCore.obj.decrypt({ str: ls.getData('LibertyStore'), key: passwordRef.current })
    }

    const setStoreData = <T>(data: T) => {
        const encryptedData = libertyCore.obj.encrypt({ obj: data, key: passwordRef.current })
        ls.setData('LibertyStore', encryptedData)
    }

    return {
        hasReg,
        getSalt,
        getResetPassHash,
        derivePassword,
        deleteAllData,
        getHash,
        getStoreData,
        setStoreData,
    }
}