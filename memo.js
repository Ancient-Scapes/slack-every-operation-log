async function joinChannel(id) {
  try {
    await app.client.conversations.join({
      token,
      channel: id,
    });
  } catch (e) {
    console.error(e);
  }
}
