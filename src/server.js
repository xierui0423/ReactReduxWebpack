
/**
 * Created by ray.xie on 9/12/2016.
 */

import Server from 'socket.io';

export default function startServer(appStore) {
  const io = new Server().attach(8090);

  appStore.subscribe(() => io.emit('state', appStore.getState().toJSON()));

  io.on('connection', (socket) => {
    // Get the state upon client connecting
    socket.emit('state', appStore.getState().toJSON());

    // Receiving remote redux actions
    socket.on('action', appStore.dispatch.bind(appStore));
  });
}
