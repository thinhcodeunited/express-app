const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/testmongo');


    const personSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        age: Number,
        stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
    });

    const storySchema = mongoose.Schema({
        authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
        title: String
    });
    const Person = mongoose.model('person', personSchema);
    const Story = mongoose.model('story', storySchema);


    Story.
    findOne({ title: /casino royale/i }).
    populate('author', 'name'). // only return the Persons name
        exec(function (err, story) {
            if (err) return handleError(err);

            console.log('The author is %s', story.author.name);
            // prints "The author is Ian Fleming"

            console.log('The authors age is %s', story.author.age);
            // prints "The authors age is null"
        });

}
main().catch(err => {
    console.log(err);
console.log('Co loi xay ra roi ne');
});


