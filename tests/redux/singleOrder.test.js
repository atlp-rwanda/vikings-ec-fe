import { describe, it, expect } from "@jest/globals";
import { jestStore } from "../jest.setup";
import singleOrderslice, {
  getSingleOrder,
} from "../../src/features/order/singleOrderslice";

describe("order slice", () => {
  const initialState = {
    data: {},
    isLoading: false,
    error: null,
  };

  it("return singleOrderSlice", async () => {
    const expectedActions = [
      { type: "fetchSingleOrder/pending" },
      { type: "fetchSingleOrder/fulfilled", payload: { data: "mocked data" } },
    ];

    const slice = await jestStore.dispatch(getSingleOrder({ page: 1 }));
    expect(
      jestStore
        .getActions()
        .map((each) => {
          return each.type;
        })
        .includes(expectedActions[1].type)
    ).toBe(true);
  });

  it("should set loading true while action is pending", () => {
    const action = { type: getSingleOrder.pending };
    const State = singleOrderslice(initialState, action);
    expect(State).toEqual({
      isLoading: true,
      error: null,
      data: {},
    });
  });

  it("should get order when action is fulfilled", () => {
    const action = {
      type: getSingleOrder.fulfilled,
      payload: {
        id: "fb23adef-b2e5-40f1-9066-07644961a0b3",
        status: "pending",
        buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
        products: [
          {
            quantity: 3,
            productId: "6717e8c7-c058-4670-90c3-5c8953cc844a",
          },
        ],
        fullPrice: 1000,
        paymentId: null,
        createdAt: "2023-05-03T12:42:45.035Z",
        updatedAt: "2023-05-03T12:42:45.035Z",
      },
    };
    const State = singleOrderslice(initialState, action);
    expect(State).toEqual({
      isLoading: false,
      error: null,
      data: {
        id: "fb23adef-b2e5-40f1-9066-07644961a0b3",
        status: "pending",
        buyerId: "872526ad-76be-4f44-b5d9-8032f0925c2d",
        products: [
          {
            quantity: 3,
            productId: "6717e8c7-c058-4670-90c3-5c8953cc844a",
          },
        ],
        fullPrice: 1000,
        paymentId: null,
        createdAt: "2023-05-03T12:42:45.035Z",
        updatedAt: "2023-05-03T12:42:45.035Z",
      },
    });
  });

  it("should set error true when action is rejected", () => {
    const action = { type: getSingleOrder.rejected };
    const State = singleOrderslice(initialState, action);
    expect(State).toEqual({
      ...initialState,
      isLoading: false,
      error: action.payload,
    });
  });
});
