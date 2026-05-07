import { AddSubscriptionCase, ListSubscriptionsCase, UpdateSubscriptionStatusCase } from "../../../domain/usecases";

export interface ISubscriptionManagement {
    remoteListSubscriptions: ListSubscriptionsCase;
    remoteAddSubscription: AddSubscriptionCase;
    remoteUpdateSubscriptionStatus: UpdateSubscriptionStatusCase;
    onClose: () => void;
}
