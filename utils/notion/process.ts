export const processNotionResponse = (notionRes: any) => {
  const { id, url } = notionRes;
  const notionResponse = notionRes.properties;

  const guest: Guest = {} as Guest;

  guest.resourceId = id;
  guest.resourceURL = url;
  guest.name = notionResponse["Invite Name Override"]?.rich_text?.length
    ? notionResponse["Invite Name Override"].rich_text[0].plain_text
    : notionResponse.Name.title[0].plain_text;
  guest.guestStatus = notionResponse.Status.select.name;
  guest.phone =
    notionResponse.Phone.phone_number === null
      ? undefined
      : notionResponse.Phone.phone_number;
  guest.inviteId = notionResponse.inviteId.formula.string;
  guest.address = notionResponse.Address.rich_text.length
    ? notionResponse.Address.rich_text[0].plain_text
    : undefined;
  guest.SMSUpdates = notionResponse["SMS Updates"].checkbox;
  guest.inviteCode = notionResponse["Invite Code"].rich_text.length
    ? notionResponse["Invite Code"].rich_text[0].plain_text
    : undefined;
  guest.createdAt = notionResponse["Created time"].created_time;
  // guest.guestOf: ,
  guest.addressVerified = notionResponse["Address Verified"].checkbox;
  guest.email =
    notionResponse.Email.email === null
      ? undefined
      : notionResponse.Email.email;
  guest.guestNote = notionResponse["Guest Note"].rich_text.length
    ? notionResponse["Guest Note"].rich_text[0].plain_text
    : undefined;
  guest.saveDateWave = notionResponse["Save the Date: Wave"].number;
  guest.attendingRehersalDinner = notionResponse["Rehearsal Dinner"].checkbox;
  guest.attendingBreakfast = notionResponse["Breakfast"].checkbox;
  guest.receptionOnly = notionResponse["Reception Only"].checkbox;
  guest.totalInvites = notionResponse["Total Invited"].formula.number;
  guest.totalAttendees = notionResponse["Total Attendees"].formula.number;
  guest.guestCount = {
    offered: notionResponse["Guest Count"].formula.number,
    claimed: notionResponse["Accepted"].number,
  };
  guest.plusOnes = {
    offered: notionResponse["+1's"].number,
    claimed: notionResponse["+1's"].number,
    name: notionResponse["+1 Name"].rich_text.length
      ? notionResponse["+1 Name"].rich_text[0].plain_text
      : undefined,
  };
  guest.children = {
    offered: notionResponse["+1's (Kids)"].number,
    claimed: notionResponse["Accepted: Children"].number,
  };
  guest.dinnerPicks = {
    beefDinnerCount: notionResponse["Dinner:Beef"].number,
    salmonDinnerCount: notionResponse["Dinner:Salmon"].number,
    childDinnerCount: notionResponse["Dinner:Child"].number,
    vegeterianDinnerCount: notionResponse["Dinner:Vegeterian"].number,
    infantDinnerCount: notionResponse["Dinner:Infant"].number,
  };
  guest.tags = (() => {
    const tags = [];
    notionResponse.Tags.multi_select.length
      ? notionResponse.Tags.multi_select.forEach((tag) => {
          // @ts-ignore
          tags.push(tag.name);
        })
      : null;
    return tags;
  })();

  return guest;
};
