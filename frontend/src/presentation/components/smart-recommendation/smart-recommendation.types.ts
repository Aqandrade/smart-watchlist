import { GetRecommendationCase } from "../../../domain/usecases";
import { ListSubscriptionsCase } from "../../../domain/usecases";

export interface ISmartRecommendation {
    isOpen: boolean;
    onClose: () => void;
    remoteListSubscriptions: ListSubscriptionsCase;
    remoteGetRecommendation: GetRecommendationCase;
}
