export interface SubscriptionModel {
    entity_id: string;
    provider_id: number;
    provider_name: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface SubscriptionListModel {
    items: SubscriptionModel[];
}
