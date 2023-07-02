({
    sendMessage : function(component, event, helper) {
        const inputElement = component.find('inputBox');
        if (inputElement) {
            const message = inputElement.get('v.value');
            const messages = component.get('v.messages');
            messages.push({
                id: message.length,
                message: message,
                from : 'AURA'
            });

            component.set('v.messages', messages);

            const messagePayload = {
                message: message,
                from: 'AURA'
            };

            const msgChannel = component.find('messageChannel');
            msgChannel.publish(messagePayload);

            inputElement.set('v.value', '');
        }
    },

    handleMessage : function(component, event, helper) {

        if (event && event.getParam('message') && event.getParam('from') !== 'AURA') {
            const message = event.getParam('message');
            const messages = component.get('v.messages');
            messages.push({
                id: message.length,
                message: message,
                from : 'LWC'
            });
            component.set('v.messages', messages);
        }
    }
})
