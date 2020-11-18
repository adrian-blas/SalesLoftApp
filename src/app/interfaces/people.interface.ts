export interface PeopleInterface {
    id: number;
    created_at: Date;
    updated_at: Date;
    last_contacted_at: Date;
    last_replied_at: Date;
    first_name: string;
    last_name: string;
    display_name: string;
    email_address: string;
    full_email_address: string;
    secondary_email_address: string;
    personal_email_address: string;
    phone: string;
    phone_extension: string;
    home_phone: string;
    mobile_phone: string;
    linkedin_url: string;
    title: string;
    city: string;
    state: string;
    country: string;
    work_city: string;
    work_state: string;
    work_country: string;
    crm_url: string;
    crm_id: string;
    crm_object_type: string;
    owner_crm_id: string;
    person_company_name: string;
    person_company_website: string;
    person_company_industry: string;
    do_not_contact: boolean;
    bouncing: boolean;
    locale: string;
    personal_website: string;
    twitter_handle: string;
    last_contacted_type: string;
    job_seniority: string;
    custom_fields: CustomFields;
    tags: string[];
    contact_restrictions: string[];
    counts: Counts;
    account: Account;
    owner: Account;
    last_contacted_by: Account;
    import: Account;
    person_stage: Account;
}

export interface Account {
    id: number;
    _href: string;
}

export interface Counts {
    emails_sent: number;
    emails_viewed: number;
    emails_clicked: number;
    emails_replied_to: number;
    emails_bounced: number;
    calls: number;
}

export interface CustomFields {
    MyField: string;
    Other: string;
}

export interface FrequencyTable {
    charName: string;
    count: number;
}

export interface SimilarityTable {
    email1: string;
    email2: string;
}
