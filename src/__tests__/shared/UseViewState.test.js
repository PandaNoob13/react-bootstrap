import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import useViewState from "../../shared/hook/UseViewState"

describe("View state hook", () => {
    test('Set Loading', () => {
        const {result} = renderHook(() => useViewState())
        act(() => {
            result.current.setLoading()
        })
        expect(result.current.viewState.isLoading).toBeTruthy();
        expect(result.current.viewState.data).toBeNull();
        expect(result.current.viewState.error).toBeNull();
    })
    test('Set Data', () => {
        const {result} = renderHook(() => useViewState())
        act(() => {
            result.current.setData({product: '123'})
        })
        expect(result.current.viewState.isLoading).toBeFalsy();
        expect(result.current.viewState.data.product).toBe('123');
        expect(result.current.viewState.error).toBeNull();
    })
    test('Set Error', () => {
        const {result} = renderHook(() => useViewState())
        act(() => {
            result.current.setError('error')
        })
        expect(result.current.viewState.isLoading).toBeFalsy();
        expect(result.current.viewState.data).toBeNull();
        expect(result.current.viewState.error).toBe('error');
    })
})