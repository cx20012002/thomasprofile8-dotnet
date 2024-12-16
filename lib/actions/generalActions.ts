import { client } from "@/sanity/lib/client";
import { ContactEntry, Subscriber } from "../types/generalTypes";
import { CONTACT_ENTRIES_QUERY, SUBSCRIBER_BY_EMAIL_QUERY } from "@/sanity/lib/general/generalQueries";
import { ActionResult } from "../types/authTypes";

// create subscriber
export const createSubscriber = async (subscriber: Subscriber): Promise<ActionResult<string>> => {
  const subscriberExists = await checkIfSubscriberExists(subscriber.email);
  if (subscriberExists) {
    return { status: "error", error: "You are already subscribed to our newsletter" };
  }

  const newSubscriber = await client.create({
    ...subscriber,
    _type: "subscriber",
  });

  return { status: "success", data: "Subscriber created" };
};

// check if subscriber exists by email
const checkIfSubscriberExists = async (email: string) => {
  const subscriber = await client.fetch(SUBSCRIBER_BY_EMAIL_QUERY, { email });
  return subscriber;
};

// create contact entry
export const createContactEntry = async (contactEntry: ContactEntry): Promise<ActionResult<string>> => {
  await client.create({
    ...contactEntry,
    _type: "contactEntry"
  });
  return { status: "success", data: "Contact entry created" };
};
