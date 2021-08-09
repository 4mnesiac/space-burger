import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import {useParams} from 'react-router-dom'
import React from 'react';

type TUseParams = {
    id: string;
  }


export const useAppParams = () => useParams<TUseParams>()
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// кастомный хук для автофокуса инпутов
export const useFocus = () => {
    const htmlElRef = React.useRef(null)
    const setFocus = ():void => { htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}