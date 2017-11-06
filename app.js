Vue.component('vue-option', {
    props: {
        item: Object,
        index: 0
    },
    template: `<option :value=item.id>{{ item.title }}</option>`,
    mounted: function() {
        console.log(this.item);
    }
});

Vue.component('item', {
    props: {
        item: Object
    },
    template: `<li>
        {{ item.title }}
        <ul v-if="item.children.length > 0">
            <item v-for="(child, index) in item.children"  :key=index :item=child></item>
        </ul>
    </li>`
});

new Vue({
    el: '#app',
    data: {
        list: [{title: 'lala', children: [], id: 0}],
        newItem: {
            parent: '',
            title: ''
        },
        total: 1
    },
    methods: {
        addItem: function() {
            if (this.newItem.parent === '') {
                this.list.push({title: this.newItem.title, children: [], id: this.total});
            } else {
                this.list.forEach((item) => {
                    this.addItemToParent(this.list, this.newItem.parent, {title: this.newItem.title, children: [], id: this.total});
                });
            }
            this.total++;
        },
        addItemToParent: function (items, parentId, item) {
            items.forEach((_item) => {
                if (_item.id == parentId) {
                    _item.children.push(item)
                    return;
                }
                if (_item.children.length > 0) {
                    this.addItemToParent(_item.children, parentId, item);
                }
            });
        }

    }
});