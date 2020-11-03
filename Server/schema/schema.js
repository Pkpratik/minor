const _ = require("lodash");
const graphql = require("graphql");
const Book = require("./models/book");
const Author = require("./models/Author");

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },

    name: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    genre: { type: new GraphQLList(GraphQLString) },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //console.log(parent);
        //console.log(parent.author);
        //console.log(parent.author[0]);
        //console.log(Author.find({ name: "Harper Lee" }));
        //return _.find(authors, { id: parent.authorId });
        //authname = [];
        //authname.push(Author.findById("5f62761f6bdefe1788871a6d"));
        //console.log(authname);
        //for (i = 0; i < parent.author.length; i++) {
        //console.log(parent.author[i]);
        //authname.push(Author.find({ name: parent.author[i] }));
        //}
        //console.log(authname);
        //return Author.findById(parent.authorId);
        return Author.find({ name: parent.author });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //console.log(parent);
        //return _.filter(books, { authorId: parent.id });
        return Book.find({ author: parent.name });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(books, { id: args.id });
        return Book.findById(args._id);
      },
    },
    // insertmanyauthors: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     return Author.insertMany([
    //       { name: "V.C. Andrews" },
    //       { name: "Richelle Mead" },
    //       { name: "Thomas Pynchon" },
    //       { name: "Kathryn Stockett" },
    //       { name: "Ken Follett" },
    //       { name: "E.L. James" },
    //       { name: "Jodi Picoult" },
    //       { name: "Jeffrey Eugenides" },
    //       { name: "Maurice Sendak" },
    //       { name: "Frances Hodgson Burnett" },
    //       { name: "Rohinton Mistry" },
    //       { name: "Marie Lu" },
    //       { name: "Kim Edwards" },
    //       { name: "Anne Morrow Lindbergh" },
    //       { name: "Helen Keller" },
    //       { name: "Chinua Achebe" },
    //       { name: "L.M. Montgomery" },
    //       { name: "Gillian Flynn" },
    //       { name: "Robin Hobb" },
    //       { name: "Sue Monk Kidd" },
    //       { name: "Charles Dickens" },
    //       { name: "Jay Asher" },
    //       { name: "Tamora Pierce" },
    //       { name: "William Shakespeare" },
    //       { name: "Richard Wright" },
    //       { name: "E.L. Konigsburg" },
    //       { name: "Ellen Raskin" },
    //       { name: "Suzanne Collins" },
    //       { name: "Daniel Quinn" },
    //       { name: "Daniel Keyes" },
    //       { name: "A.S. Byatt" },
    //       { name: "Walter Scott" },
    //       { name: "Andre Dubus III" },
    //       { name: "Walter M. Miller Jr." },
    //       { name: "Julie Kagawa" },
    //       { name: "Aldous Huxley" },
    //       { name: "Chaim Potok" },
    //       { name: "Simone Elkeles" },
    //       { name: "Karen Marie Moning" },
    //       { name: "Douglas Adams" },
    //       { name: "Yann Martel" },
    //       { name: "Garth Nix" },
    //       { name: "Margaret Atwood" },
    //       { name: "Sylvia Day" },
    //       { name: "Reduced Shakespeare Company" },
    //       { name: "Willa Cather" },
    //       { name: "Ernest Cline" },
    //       { name: "Cassandra Clare" },
    //       { name: "Howard Zinn" },
    //       { name: "Maya Angelou" },
    //       { name: "James Dashner" },
    //       { name: "Ernest Hemingway" },
    //       { name: "Ransom Riggs" },
    //       { name: "Diana Gabaldon" },
    //       { name: "John Berendt" },
    //       { name: "Max Lucado" },
    //       { name: "Ki Longfellow" },
    //       { name: "Orson Scott Card" },
    //       { name: "Lauren Oliver" },
    //       { name: "Eric Carle" },
    //       { name: "Donna Tartt" },
    //       { name: "Tahereh Mafi" },
    //       { name: "Michael Shaara" },
    //       { name: "Charlaine Harris" },
    //       { name: "Michael  Grant" },
    //       { name: "David McCullough" },
    //       { name: "J.D. Salinger" },
    //       { name: "Michael Chabon" },
    //       { name: "Kurt Vonnegut" },
    //       { name: "Alice Sebold" },
    //       { name: "Tom Robbins" },
    //       { name: "Stephen King" },
    //       { name: "Dave Pelzer" },
    //       { name: "Jeaniene Frost" },
    //       { name: "Max Brooks" },
    //       { name: "Maria V. Snyder" },
    //       { name: "Pat Conroy" },
    //       { name: "Kate Chopin" },
    //       { name: "Andy Weir" },
    //       { name: "Frank Herbert" },
    //       { name: "Bill Bryson" },
    //       { name: "Jojo Moyes" },
    //       { name: "E.M. Forster" },
    //       { name: "Stephenie Meyer" },
    //       { name: "Gayle Forman" },
    //       { name: "Veronica Roth" },
    //       { name: "Gregory David Roberts" },
    //       { name: "Ursula K. Le Guin" },
    //       { name: "Jonathan Franzen" },
    //       { name: "Terry Pratchett" },
    //       { name: "Harper Lee" },
    //       { name: "Judy Blume" },
    //       { name: "Kate DiCamillo" },
    //       { name: "Edgar Allan Poe" },
    //       { name: "Ann Brashares" },
    //       { name: "Dan Brown" },
    //       { name: "Jean M. Auel" },
    //       { name: "Benjamin Alire SÃ¡enz" },
    //       { name: "W. Bruce Cameron" },
    //       { name: "Ally Condie" },
    //       { name: "Sharon Creech" },
    //       { name: "Bill Watterson" },
    //       { name: "Sherrilyn Kenyon" },
    //       { name: "Christopher Moore" },
    //       { name: "Bret Easton Ellis" },
    //       { name: "J.R.R. Tolkien" },
    //       { name: "Khaled Hosseini" },
    //       { name: "Madeleine L'Engle" },
    //       { name: "John Steinbeck" },
    //       { name: "Lisa See" },
    //       { name: "Annie Proulx" },
    //       { name: "Stephanie Perkins" },
    //       { name: "Rainbow Rowell" },
    //       { name: "Rick Riordan" },
    //       { name: "Lionel Shriver" },
    //       { name: "George R.R. Martin" },
    //       { name: "Mark Haddon" },
    //       { name: "T.H. White" },
    //       { name: "Arthur Miller" },
    //       { name: "Richard Matheson" },
    //       { name: "Henry David Thoreau" },
    //       { name: "Neil Gaiman" },
    //       { name: "Maggie Stiefvater" },
    //       { name: "Scott O'Dell" },
    //       { name: "Louisa May Alcott" },
    //       { name: "C.S. Lewis" },
    //       { name: "Lauren Kate" },
    //       { name: "William Gibson" },
    //       { name: "John Fowles" },
    //       { name: "Patrick Ness" },
    //       { name: "Rhonda Byrne" },
    //       { name: "Markus Zusak" },
    //       { name: "Patrick Rothfuss" },
    //       { name: "Hermann Hesse" },
    //       { name: "Neal Shusterman" },
    //       { name: "Tennessee Williams" },
    //       { name: "Ray Bradbury" },
    //       { name: "Dean Koontz" },
    //       { name: "David Foster Wallace" },
    //       { name: "Neal Stephenson" },
    //       { name: "Robert A. Heinlein" },
    //       { name: "Nick Hornby" },
    //       { name: "Raymond Chandler" },
    //       { name: "Anthony Burgess" },
    //       { name: "Isaac Asimov" },
    //       { name: "Joanne Harris" },
    //       { name: "Betty  Smith" },
    //       { name: "Sarah Dessen" },
    //       { name: "Robert Ludlum" },
    //       { name: "David Nicholls" },
    //       { name: "John Green" },
    //       { name: "John Boyne" },
    //       { name: "Agatha Christie" },
    //       { name: "Rick Yancey" },
    //       { name: "Scott Westerfeld" },
    //       { name: "William Faulkner" },
    //       { name: "Brandon Sanderson" },
    //       { name: "Barbara Kingsolver" },
    //       { name: "John Irving" },
    //       { name: "Wally Lamb" },
    //       { name: "David Mitchell" },
    //       { name: "Toni Morrison" },
    //       { name: "Laura Hillenbrand" },
    //       { name: "Shannon Hale" },
    //       { name: "Louis de-BerniÃ¨res" },
    //       { name: "Emma Donoghue" },
    //       { name: "Alyson Noel" },
    //       { name: "Carl Sagan" },
    //       { name: "Kelley Armstrong" },
    //       { name: "J.R. Ward" },
    //       { name: "Alice Walker" },
    //       { name: "Jack Kerouac" },
    //       { name: "Tatiana de Rosnay" },
    //       { name: "Cormac McCarthy" },
    //       { name: "Philippa Gregory" },
    //       { name: "Jonathan Safran Foer" },
    //       { name: "Margaret Mitchell" },
    //       { name: "James Patterson" },
    //       { name: "Alan Paton" },
    //       { name: "Philip Pullman" },
    //       { name: "Tim O'Brien" },
    //       { name: "Janet Evanovich" },
    //       { name: "Laini Taylor" },
    //       { name: "Arthur Conan Doyle" },
    //       { name: "Emmuska Orczy" },
    //       { name: "Arthur C. Clarke" },
    //       { name: "Sarah J. Maas" },
    //       { name: "Tracy Chevalier" },
    //       { name: "Francine Rivers" },
    //       { name: "Anne Rice" },
    //       { name: "Mitch Albom" },
    //       { name: "Jamie McGuire" },
    //       { name: "Becca Fitzpatrick" },
    //       { name: "Jane Austen" },
    //       { name: "J.K. Rowling" },
    //       { name: "Christopher Paolini" },
    //       { name: "Anita Diamant" },
    //       { name: "Eoin Colfer" },
    //       { name: "Daphne du Maurier" },
    //       { name: "Shel Silverstein" },
    //       { name: "Michelle Hodkin" },
    //       { name: "Larry McMurtry" },
    //       { name: "William Goldman" },
    //       { name: "Nicole Krauss" },
    //       { name: "D.H. Lawrence" },
    //       { name: "Michael Pollan" },
    //       { name: "Jon Krakauer" },
    //       { name: "Dan Simmons" },
    //       { name: "Arthur Golden" },
    //       { name: "Dalton Trumbo" },
    //       { name: "Jhumpa Lahiri" },
    //       { name: "Dave Eggers" },
    //       { name: "Frank McCourt" },
    //       { name: "Truman Capote" },
    //       { name: "James Clavell" },
    //       { name: "Fannie Flagg" },
    //       { name: "Nicholas Sparks" },
    //       { name: "Janet Fitch" },
    //     ]);
    //   },
    // },
    // insertmanybooks: {
    //   type: BookType,
    //   resolve(parent, args) {
    //     return Book.insertMany([
    //       {
    //         author: "Suzanne Collins",
    //         description:
    //           "Winning will make you famous. Losing means certain death.The nation of Panem, formed from a post-apocalyptic North America, is a country that consists of a wealthy Capitol region surrounded by 12 poorer districts. Early in its history, a rebellion led by a 13th district against the Capitol resulted in its destruction and the creation of an annual televised event known as the Hunger Games. In punishment, and as a reminder of the power and grace of the Capitol, each district must yield one boy and one girl between the ages of 12 and 18 through a lottery system to participate in the games. The 'tributes' are chosen during the annual Reaping and are forced to fight to the death, leaving only one survivor to claim victory.When 16-year-old Katniss's young sister, Prim, is selected as District 12's female representative, Katniss volunteers to take her place. She and her male counterpart Peeta, are pitted against bigger, stronger representatives, some of whom have trained for this their whole lives. , she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",

    //         rating: 4.33,
    //         name: "The Hunger Games",
    //         genre:
    //           "'Young Adult','Fiction','Science Fiction','Dystopia','Fantasy','Science Fiction'",
    //         image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
    //       },
    //       {
    //         author: "J.K. Rowling",
    //         description:
    //           "There is a door at the end of a silent corridor. And it’s haunting Harry Pottter’s dreams. Why else would he be waking in the middle of the night, screaming in terror?Harry has a lot on his mind for this, his fifth year at Hogwarts: a Defense Against the Dark Arts teacher with a personality like poisoned honey; a big surprise on the Gryffindor Quidditch team; and the looming terror of the Ordinary Wizarding Level exams. But all these things pale next to the growing threat of He-Who-Must-Not-Be-Named---a threat that neither the magical government nor the authorities at Hogwarts can stop.As the grasp of darkness tightens, Harry must discover the true depth and strength of his friends, the importance of boundless loyalty, and the shocking price of unbearable sacrifice.His fate depends on them alll.(back cover)",

    //         rating: 4.48,
    //         name: "Harry Potter and the Order of the Phoenix",
    //         genre: "Fantasy,Young Adult,Fiction",
    //         image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
    //       },
    //       {
    //         author: "Harper Lee",
    //         description:
    //           "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.Compassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.",

    //         rating: 4.27,
    //         name: "To Kill a Mockingbird",
    //         genre:
    //           "Classics,Fiction,Historical,Historical Fiction,Academic,School",
    //         image: "https://images.gr-assets.com/books/1361975680l/2657.jpg",
    //       },
    //       {
    //         author: "Stephenie Meyer",
    //         description:
    //           "About three things I was absolutely positive.First, Edward was a vampire.Second, there was a part of him—and I didn't know how dominant that part might be—that thirsted for my blood.And third, I was unconditionally and irrevocably in love with him.In the first book of the Twilight Saga, internationally bestselling author Stephenie Meyer introduces Bella Swan and Edward Cullen, a pair of star-crossed lovers whose forbidden relationship ripens against the backdrop of small-town suspicion and a mysterious coven of vampires. This is a love story with bite.",

    //         rating: 3.58,
    //         name: "Twilight",
    //         genre:
    //           "Young Adult,Fantasy,Romance,Paranormal,Vampires,Fiction,Fantasy,Paranormal",
    //         image: "https://images.gr-assets.com/books/1361039443l/41865.jpg",
    //       },
    //       {
    //         author: "Markus Zusak",
    //         description:
    //           "Trying to make sense of the horrors of World War II, Death relates the story of Liesel--a young German girl whose book-stealing and story-telling talents help sustain her family and the Jewish man they are hiding, as well as their neighbors.",

    //         rating: 4.36,
    //         name: "The Book Thief",
    //         genre: "Historical,Historical Fiction,Fiction,Young Adult",
    //         image: "https://images.gr-assets.com/books/1522157426l/19063.jpg",
    //       },
    //       {
    //         author: "Margaret Mitchell",
    //         description:
    //           "Gone with the Wind is a novel written by Margaret Mitchell, first published in 1936. The story is set in Clayton County, Georgia, and Atlanta during the American Civil War and Reconstruction era. It depicts the struggles of young Scarlett O'Hara, the daughter of a well-to-do plantation owner, who must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea. A historical novel, the story is a Bildungsroman or coming-of-age story, with the title taken from a poem written by Ernest Dowson.",

    //         rating: 4.29,
    //         name: "Gone with the Wind",
    //         genre:
    //           "Classics,Historical,Historical Fiction,Fiction,Romance,Historical",
    //         image: "https://images.gr-assets.com/books/1328025229l/18405.jpg",
    //       },
    //       {
    //         author: "John Green",
    //         description:
    //           "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love.",

    //         rating: 4.24,
    //         name: "The Fault in Our Stars",
    //         genre: "Young Adult,Fiction,Romance,Contemporary",
    //         image:
    //           "https://images.gr-assets.com/books/1360206420l/11870085.jpg",
    //       },
    //       {
    //         author: "Douglas Adams",
    //         description:
    //           "Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker's Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor.Together this dynamic pair begin a journey through space aided by quotes from The Hitchhiker's Guide (A towel is about the most massively useful thing an interstellar hitchhiker can have) and a galaxy-full of fellow travelers: Zaphod Beeblebrox—the two-headed, three-armed ex-hippie and totally out-to-lunch president of the galaxy; Trillian, Zaphod's girlfriend (formally Tricia McMillan), whom Arthur tried to pick up at a cocktail party once upon a time zone; Marvin, a paranoid, brilliant, and chronically depressed robot; Veet Voojagig, a former graduate student who is obsessed with the disappearance of all the ballpoint pens he bought over the years.",

    //         rating: 4.21,
    //         name: "The Hitchhiker's Guide to the Galaxy",
    //         genre: "Science Fiction,Fiction,Humor,Fantasy,Classics",
    //         image: "https://images.gr-assets.com/books/1388282444l/386162.jpg",
    //       },
    //       {
    //         author: "Shel Silverstein",
    //         description:
    //           "Once there was a tree...and she loved a little boy.So begins a story of unforgettable perception, beautifully written and illustrated by the gifted and versatile Shel Silverstein.Every day the boy would come to the tree to eat her apples, swing from her branches, or slide down her trunk...and the tree was happy. But as the boy grew older he began to want more from the tree, and the tree gave and gave and gave.This is a tender story, touched with sadness, aglow with consolation. Shel Silverstein has created a moving parable for readers of all ages that offers an affecting interpretation of the gift of giving and a serene acceptance of another's capacity to love in return.",

    //         rating: 4.37,
    //         name: "The Giving Tree",
    //         genre: "Childrens,Childrens,Picture Books,Classics,Fiction",
    //         image: "https://images.gr-assets.com/books/1174210942l/370493.jpg",
    //       },
    //       {
    //         author: "Dan Brown",
    //         description:
    //           "An ingenious code hidden in the works of Leonardo da Vinci.A desperate race through the cathedrals and castles of Europe.An astonishing truth concealed for centuries . . . unveiled at last.While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.Even more startling, the late curator was involved in the Priory of Sion—a secret society whose members included Sir Isaac Newton, Victor Hugo, and Da Vinci—and he guarded a breathtaking historical secret. Unless Langdon and Neveu can decipher the labyrinthine puzzle—while avoiding the faceless adversary who shadows their every move—the explosive, ancient truth will be lost forever.",

    //         rating: 3.81,
    //         name: "The Da Vinci Code",
    //         genre: "Fiction,Mystery,Thriller",
    //         image: "https://images.gr-assets.com/books/1303252999l/968.jpg",
    //       },
    //       {
    //         author: "Arthur Golden",
    //         description:
    //           "A literary sensation and runaway bestseller, this brilliant debut novel presents with seamless authenticity and exquisite lyricism the true confessions of one of Japan's most celebrated geisha.In Memoirs of a Geisha, we enter a world where appearances are paramount; where a girl's virginity is auctioned to the highest bidder; where women are trained to beguile the most powerful men; and where love is scorned as illusion. It is a unique and triumphant work of fiction - at once romantic, erotic, suspenseful - and completely unforgettable.",

    //         rating: 4.09,
    //         name: "Memoirs of a Geisha",
    //         genre: "Fiction,Historical,Historical Fiction,Romance,Historical",
    //         image: "https://images.gr-assets.com/books/1388367666l/930.jpg",
    //       },
    //       {
    //         author: "Veronica Roth",
    //         description:
    //           "In Beatrice Prior's dystopian Chicago world, society is divided into five factions, each dedicated to the cultivation of a particular virtue—Candor (the honest), Abnegation (the selfless), Dauntless (the brave), Amity (the peaceful), and Erudite (the intelligent). On an appointed day of every year, all sixteen-year-olds must select the faction to which they will devote the rest of their lives. For Beatrice, the decision is between staying with her family and being who she really is—she can't have both. So she makes a choice that surprises everyone, including herself.During the highly competitive initiation that follows, Beatrice renames herself Tris and struggles alongside her fellow initiates to live out the choice they have made. Together they must undergo extreme physical tests of endurance and intense psychological simulations, some with devastating consequences. As initiation transforms them all, Tris must determine who her friends really are—and where, exactly, a romance with a sometimes fascinating, sometimes exasperating boy fits into the life she's chosen. But Tris also has a secret, one she's kept hidden from everyone because she's been warned it can mean death. And as she discovers unrest and growing conflict that threaten to unravel her seemingly perfect society, she also learns that her secret might help her save those she loves . . . or it might destroy her.",

    //         rating: 4.22,
    //         name: "Divergent",
    //         genre: "Young Adult,Science Fiction,Dystopia,Fiction,Fantasy",
    //         image:
    //           "https://images.gr-assets.com/books/1328559506l/13335037.jpg",
    //       },
    //       {
    //         author: "Orson Scott Card",
    //         description:
    //           "Andrew Ender Wiggin thinks he is playing computer simulated war games; he is, in fact, engaged in something far more desperate. The result of genetic experimentation, Ender may be the military genius Earth desperately needs in a war against an alien enemy seeking to destroy all human life. The only way to find out is to throw Ender into ever harsher training, to chip away and find the diamond inside, or destroy him utterly. Ender Wiggin is six years old when it begins. He will grow up fast.But Ender is not the only result of the experiment. The war with the Buggers has been raging for a hundred years, and the quest for the perfect general has been underway almost as long. Ender's two older siblings, Peter and Valentine, are every bit as unusual as he is, but in very different ways. While Peter was too uncontrollably violent, Valentine very nearly lacks the capability for violence altogether. Neither was found suitable for the military's purpose. But they are driven by their jealousy of Ender, and by their inbred drive for power. Peter seeks to control the political process, to become a ruler. Valentine's abilities turn more toward the subtle control of the beliefs of commoner and elite alike, through powerfully convincing essays. Hiding their youth and identities behind the anonymity of the computer networks, these two begin working together to shape the destiny of Earth-an Earth that has no future at all if their brother Ender fails.Source: hatrack.com",

    //         rating: 4.3,
    //         name: "Ender's Game",
    //         genre: "Science Fiction,Fiction,Young Adult,Fantasy",
    //         image: "https://images.gr-assets.com/books/1408303130l/375802.jpg",
    //       },
    //       {
    //         author: "Kathryn Stockett",
    //         description:
    //           "Be prepared to meet three unforgettable women:Twenty-two-year-old Skeeter has just returned home after graduating from Ole Miss. She may have a degree, but it is 1962, Mississippi, and her mother will not be happy till Skeeter has a ring on her finger. Skeeter would normally find solace with her beloved maid Constantine, the woman who raised her, but Constantine has disappeared and no one will tell Skeeter where she has gone.Aibileen is a black maid, a wise, regal woman raising her seventeenth white child. Something has shifted inside her after the loss of her own son, who died while his bosses looked the other way. She is devoted to the little girl she looks after, though she knows both their hearts may be broken.Minny, Aibileen’s best friend, is short, fat, and perhaps the sassiest woman in Mississippi. She can cook like nobody’s business, but she can’t mind her tongue, so she’s lost yet another job. Minny finally finds a position working for someone too new to town to know her reputation. But her new boss has secrets of her own.Seemingly as different from one another as can be, these women will nonetheless come together for a clandestine project that will put them all at risk. And why? Because they are suffocating within the lines that define their town and their times. And sometimes lines are made to be crossed.In pitch-perfect voices, Kathryn Stockett creates three extraordinary women whose determination to start a movement of their own forever changes a town, and the way women — mothers, daughters, caregivers, friends — view one another. A deeply moving novel filled with poignancy, humor, and hope, The Help is a timeless and universal story about the lines we abide by, and the ones we don't.",

    //         rating: 4.46,
    //         name: "The Help",
    //         genre: "Fiction,Historical,Historical Fiction,Historical,Adult",
    //         image: "https://images.gr-assets.com/books/1346100365l/4667024.jpg",
    //       },
    //       {
    //         author: "L.M. Montgomery",
    //         description:
    //           "As soon as Anne Shirley arrives at the snug white farmhouse called Green Gables, she is sure she wants to stay forever . . . but will the Cuthberts send her back to to the orphanage? Anne knows she's not what they expected—a skinny girl with fiery red hair and a temper to match. If only she can convince them to let her stay, she'll try very hard not to keep rushing headlong into scrapes and blurting out the first thing that comes to her mind. Anne is not like anyone else, the Cuthberts agree; she is special—a girl with an enormous imagination. This orphan girl dreams of the day when she can call herself Anne of Green Gables.",

    //         rating: 4.24,
    //         name: "Anne of Green Gables",
    //         genre:
    //           "Classics,Fiction,Young Adult,Childrens,Historical,Historical Fiction,Historical,Cultural,Canada,Childrens,Middle Grade,Audiobook,Young Adult,Coming Of Age",
    //         image: "https://images.gr-assets.com/books/1390789015l/8127.jpg",
    //       },
    //       {
    //         author: "John Steinbeck",
    //         description:
    //           "The compelling story of two outsiders striving to find their place in an unforgiving world. Drifters in search of work, George and his simple-minded friend Lennie have nothing in the world except each other and a dream--a dream that one day they will have some land of their own. Eventually they find work on a ranch in California’s Salinas Valley, but their hopes are doomed as Lennie, struggling against extreme cruelty, misunderstanding and feelings of jealousy, becomes a victim of his own strength. Tackling universal themes such as the friendship of a shared vision, and giving voice to America’s lonely and dispossessed, Of Mice and Men has proved one of Steinbeck’s most popular works, achieving success as a novel, a Broadway play and three acclaimed films.",

    //         rating: 3.85,
    //         name: "Of Mice and Men",
    //         genre:
    //           "Classics,Fiction,Academic,School,Literature,Historical,Historical Fiction",
    //         image: "https://images.gr-assets.com/books/1511302904l/890.jpg",
    //       },
    //       {
    //         author: "Aldous Huxley",
    //         description:
    //           "Brave New World is a dystopian novel written in 1931 by English author Aldous Huxley, and published in 1932. Largely set in a futuristic World State of genetically modified citizens and an intelligence-based social hierarchy, the novel anticipates huge scientific developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that are combined to make a utopian society that goes challenged only by a single outsider.",

    //         rating: 3.98,
    //         name: "Brave New World",
    //         genre:
    //           "Classics,Fiction,Science Fiction,Science Fiction,Dystopia,Literature,Novels,Academic,School,Fantasy,Science Fiction Fantasy,Philosophy",
    //         image: "https://images.gr-assets.com/books/1523061131l/5129.jpg",
    //       },
    //       {
    //         author: "William Goldman",
    //         description:
    //           "What happens when the most beautiful girl in the world marries the handsomest prince of all time and he turns out to be...well...a lot less than the man of her dreams?As a boy, William Goldman claims, he loved to hear his father read the S. Morgenstern classic, The Princess Bride. But as a grown-up he discovered that the boring parts were left out of good old Dad's recitation, and only the good parts reached his ears.Now Goldman does Dad one better. He's reconstructed the Good Parts Version to delight wise kids and wide-eyed grownups everywhere.What's it about? Fencing. Fighting. True Love. Strong Hate. Harsh Revenge. A Few Giants. Lots of Bad Men. Lots of Good Men. Five or Six Beautiful Women. Beasties Monstrous and Gentle. Some Swell Escapes and Captures. Death, Lies, Truth, Miracles, and a Little Sex.In short, it's about everything.",

    //         rating: 4.26,
    //         name: "The Princess Bride",
    //         genre: "Fantasy,Fiction,Classics,Romance,Humor,Young Adult",
    //         image: "https://images.gr-assets.com/books/1327903636l/21787.jpg",
    //       },
    //       {
    //         author: "Frances Hodgson Burnett",
    //         description:
    //           "One of the most delightful and enduring classics of children's literature, The Secret Garden by Victorian author Frances Hodgson Burnett has remained a firm favorite with children the world over ever since it made its first appearance. Initially published as a serial story in 1910 in The American Magazine, it was brought out in novel form in 1911. The plot centers round Mary Lennox, a young English girl who returns to England from India, having suffered the immense trauma by losing both her parents in a cholera epidemic. However, her memories of her parents are not pleasant, as they were a selfish, neglectful and pleasure-seeking couple. Mary is given to the care of her uncle Archibald Craven, whom she has never met. She travels to his home, Misselthwaite Manor located in the gloomy Yorkshire, a vast change from the sunny and warm climate she was used to. When she arrives, she is a rude, stubborn and given to stormy temper tantrums. However, her nature undergoes a gradual transformation when she learns of the tragedies that have befallen her strict and disciplinarian uncle whom she earlier feared and despised. Once when he's away from home, Mary discovers a charming walled garden which is always kept locked. The mystery deepens when she hears sounds of sobbing from somewhere within her uncle's vast mansion. The kindly servants ignore her queries or pretend they haven't heard, spiking Mary's curiosity. The Secret Garden appeals to both young and old alike. It has wonderful elements of mystery, spirituality, charming characters and an authentic rendering of childhood emotions and experiences. Commonsense, truth and kindness, compassion and a belief in the essential goodness of human beings lie at the heart of this unforgettable story. It is the best known of Frances Hodgson Burnett's works, though most of us have definitely heard of, if not read, her other novel Little Lord Fauntleroy. The book has been adapted extensively on stage, film and television and translated into all the world's major languages. In 1991, a Japanese anime version was launched for television in Japan. It remains a popular and beloved story of a child's journey into maturity, and a must-read for every child, parent, teacher and anyone who would enjoy this fascinating glimpse of childhood. One of the most delightful and enduring classics of children's literature, The Secret Garden by Victorian author Frances Hodgson Burnett has remained a firm favorite with children the world over ever since it made its first appearance. Initially published as a serial story in 1910 in The American Magazine, it was brought out in novel form in 1911.",

    //         rating: 4.12,
    //         name: "The Secret Garden",
    //         genre:
    //           "Classics,Fiction,Childrens,Young Adult,Historical,Historical Fiction,Childrens,Middle Grade,Literature,Fantasy,Historical,Novels",
    //         image: "https://images.gr-assets.com/books/1327873635l/2998.jpg",
    //       },
    //       {
    //         author: "J.D. Salinger",
    //         description:
    //           "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days. The boy himself is at once too simple and too complex for us to make any final comment about him or his story. Perhaps the safest thing we can say about Holden is that he was born in the world not just strongly attracted to beauty but, almost, hopelessly impaled on it. There are many voices in this novel: children's voices, adult voices, underground voices-but Holden's voice is the most eloquent of all. Transcending his own vernacular, yet remaining marvelously faithful to it, he issues a perfectly articulated cry of mixed pain and pleasure. However, like most lovers and clowns and poets of the higher orders, he keeps most of the pain to, and for, himself. The pleasure he gives away, or sets aside, with all his heart. It is there for the reader who can handle it to keep. J.D. Salinger's classic novel of teenage angst and rebellion was first published in 1951. The novel was included on Time's 2005 list of the 100 best English-language novels written since 1923. It was named by Modern Library and its readers as one of the 100 best English-language novels of the 20th century. It has been frequently challenged in the court for its liberal use of profanity and portrayal of sexuality and in the 1950's and 60's it was the novel that every teenage boy wants to read.",

    //         rating: 3.8,
    //         name: "The Catcher in the Rye",
    //         genre: "Classics,Fiction,Young Adult,Literature",
    //         image: "https://images.gr-assets.com/books/1398034300l/5107.jpg",
    //       },
    //       {
    //         author: "Khaled Hosseini",
    //         description:
    //           "A Thousand Splendid Suns is a breathtaking story set against the volatile events of Afghanistan's last thirty years—from the Soviet invasion to the reign of the Taliban to post-Taliban rebuilding—that puts the violence, fear, hope, and faith of this country in intimate, human terms. It is a tale of two generations of characters brought jarringly together by the tragic sweep of war, where personal lives—the struggle to survive, raise a family, find happiness—are inextricable from the history playing out around them.Propelled by the same storytelling instinct that made The Kite Runner a beloved classic, A Thousand Splendid Suns is at once a remarkable chronicle of three decades of Afghan history and a deeply moving account of family and friendship. It is a striking, heart-wrenching novel of an unforgiving time, an unlikely friendship, and an indestructible love—a stunning accomplishment.",

    //         rating: 4.35,
    //         name: "A Thousand Splendid Suns",
    //         genre: "Fiction,Historical,Historical Fiction",
    //         image: "https://images.gr-assets.com/books/1345958969l/128029.jpg",
    //       },
    //       {
    //         author: "Madeleine L'Engle",
    //         description:
    //           "It was a dark and stormy night; Meg Murry, her small brother Charles Wallace, and her mother had come down to the kitchen for a midnight snack when they were upset by the arrival of a most disturbing stranger. Wild nights are my glory, the unearthly stranger told them. I just got caught in a downdraft and blown off course. Let me be on my way. Speaking of way, by the way, there is such a thing as a tesseract.Meg's father had been experimenting with this fifth dimension of time travel when he mysteriously disappeared. Now the time has come for Meg, her friend Calvin, and Charles Wallace to rescue him. But can they outwit the forces of evil they will encounter on their heart-stopping journey through space?",

    //         rating: 4.02,
    //         name: "A Wrinkle in Time",
    //         genre:
    //           "Fantasy,Young Adult,Fiction,Classics,Science Fiction,Childrens",
    //         image: "https://images.gr-assets.com/books/1329061522l/18131.jpg",
    //       },
    //       {
    //         author: "George R.R. Martin",
    //         description:
    //           "Here is the first volume in George R. R. Martin’s magnificent cycle of novels that includes A Clash of Kings and A Storm of Swords. As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced. Already hailed as a classic, George R. R. Martin’s stunning series is destined to stand as one of the great achievements of imaginative fiction.A GAME OF THRONESLong ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens.Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.source: georgerrmartin.com",

    //         rating: 4.45,
    //         name: "A Game of Thrones",
    //         genre: "Fantasy,Fiction,Fantasy,Epic Fantasy",
    //         image: "https://images.gr-assets.com/books/1436732693l/13496.jpg",
    //       },
    //       {
    //         author: "Rick Riordan",
    //         description:
    //           "Alternate cover for this ISBN can be found herePercy Jackson is a good kid, but he can't seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse - Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him. When Percy's mom finds out, she knows it's time that he knew the truth about where he came from, and that he go to the one place he'll be safe. She sends Percy to Camp Half Blood, a summer camp for demigods (on Long Island), where he learns that the father he never knew is Poseidon, God of the Sea. Soon a mystery unfolds and together with his friends—one a satyr and the other the demigod daughter of Athena - Percy sets out on a quest across the United States to reach the gates of the Underworld (located in a recording studio in Hollywood) and prevent a catastrophic war between the gods.",

    //         rating: 4.24,
    //         name: "The Lightning Thief",
    //         genre: "Fantasy,Young Adult,Fantasy,Mythology,Fiction",
    //         image: "https://images.gr-assets.com/books/1400602609l/28187.jpg",
    //       },
    //       {
    //         author: "Alice Sebold",
    //         description:
    //           "The Lovely Bones is the story of a family devastated by a gruesome murder -- a murder recounted by the teenage victim. Upsetting, you say? Remarkably, first-time novelist Alice Sebold takes this difficult material and delivers a compelling and accomplished exploration of a fractured family's need for peace and closure.The details of the crime are laid out in the first few pages: from her vantage point in heaven, Susie Salmon describes how she was confronted by the murderer one December afternoon on her way home from school. Lured into an underground hiding place, she was raped and killed. But what the reader knows, her family does not. Anxiously, we keep vigil with Susie, aching for her grieving family, desperate for the killer to be found and punished.Sebold creates a heaven that's calm and comforting, a place whose residents can have whatever they enjoyed when they were alive -- and then some. But Susie isn't ready to release her hold on life just yet, and she intensely watches her family and friends as they struggle to cope with a reality in which she is no longer a part. To her great credit, Sebold has shaped one of the most loving and sympathetic fathers in contemporary literature.",

    //         rating: 3.79,
    //         name: "The Lovely Bones",
    //         genre: "Fiction,Mystery,Young Adult,Contemporary",
    //         image:
    //           "https://images.gr-assets.com/books/1457810586l/12232938.jpg",
    //       },
    //       {
    //         author: "Maurice Sendak",
    //         description:
    //           "One night Max puts on his wolf suit and makes mischief of one kind and another, so his mother calls him 'Wild Thing' and sends him to bed without his supper. That night a forest begins to grow in Max's room and an ocean rushes by with a boat to take Max to the place where the wild things are. Max tames the wild things and crowns himself as their king, and then the wild rumpus begins. But when Max has sent the monsters to bed, and everything is quiet, he starts to feel lonely and realises it is time to sail home to the place where someone loves him best of all.",

    //         rating: 4.22,
    //         name: "Where the Wild Things Are",
    //         genre: "Childrens,Childrens,Picture Books,Fiction,Classics",
    //         image: "https://images.gr-assets.com/books/1384434560l/19543.jpg",
    //       },
    //       {
    //         author: "Yann Martel",
    //         description:
    //           "Life of Pi is a fantasy adventure novel by Yann Martel published in 2001. The protagonist, Piscine Molitor Pi Patel, a Tamil boy from Pondicherry, explores issues of spirituality and practicality from an early age. He survives 227 days after a shipwreck while stranded on a boat in the Pacific Ocean with a Bengal tiger named Richard Parker.",

    //         rating: 3.89,
    //         name: "Life of Pi",
    //         genre: "Fiction,Fantasy,Classics,Adventure",
    //         image: "https://images.gr-assets.com/books/1320562005l/4214.jpg",
    //       },
    //       {
    //         author: "Daphne du Maurier",
    //         description:
    //           "Last night I dreamt I went to Manderley again . . .The novel begins in Monte Carlo, where our heroine is swept off her feet by the dashing widower Maxim de Winter and his sudden proposal of marriage. Orphaned and working as a lady's maid, she can barely believe her luck. It is only when they arrive at his massive country estate that she realizes how large a shadow his late wife will cast over their lives--presenting her with a lingering evil that threatens to destroy their marriage from beyond the grave.",

    //         rating: 4.21,
    //         name: "Rebecca",
    //         genre: "Classics,Fiction,Mystery,Romance,Gothic",
    //         image:
    //           "https://images.gr-assets.com/books/1386605169l/17899948.jpg",
    //       },
    //       {
    //         author: "Betty  Smith",
    //         description:
    //           "The beloved American classic about a young girl's coming-of-age at the turn of the century, Betty Smith's A Tree Grows in Brooklyn is a poignant and moving tale filled with compassion and cruelty, laughter and heartache, crowded with life and people and incident. The story of young, sensitive, and idealistic Francie Nolan and her bittersweet formative years in the slums of Williamsburg has enchanted and inspired millions of readers for more than sixty years. By turns overwhelming, sublime, heartbreaking, and uplifting, the daily experiences of the unforgettable Nolans are raw with honesty and tenderly threaded with family connectedness -- in a work of literary art that brilliantly captures a unique time and place as well as incredibly rich moments of universal experience.",

    //         rating: 4.25,
    //         name: "A Tree Grows in Brooklyn",
    //         genre: "Classics,Fiction,Historical,Historical Fiction,Young Adult",
    //         image: "https://images.gr-assets.com/books/1327883484l/14891.jpg",
    //       },
    //       {
    //         author: "Alice Walker",
    //         description:
    //           "The Color Purple is a classic. With over a million copies sold in the UK alone, it is hailed as one of the all-time 'greats' of literature, inspiring generations of readers.Set in the deep American South between the wars, it is the tale of Celie, a young black girl born into poverty and segregation. Raped repeatedly by the man she calls 'father', she has two children taken away from her, is separated from her beloved sister Nettie and is trapped into an ugly marriage. But then she meets the glamorous Shug Avery, singer and magic-maker - a woman who has taken charge of her own destiny. Gradually, Celie discovers the power and joy of her own spirit, freeing her from her past and reuniting her with those she loves.",

    //         rating: 4.18,
    //         name: "The Color Purple",
    //         genre: "Classics,Fiction,Historical,Historical Fiction,Feminism",
    //         image: "https://images.gr-assets.com/books/1386925078l/11486.jpg",
    //       },
    //       {
    //         author: "J.R.R. Tolkien",
    //         description:
    //           "Alternate Cover Edition ISBN 0618260269 (copyright page ISBN is 0618346252 - different from back cover)One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkeness bind themIn ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, The Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in The Hobbit.In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.--back cover",

    //         rating: 4.35,
    //         name: "The Fellowship of the Ring",
    //         genre: "Fantasy,Classics,Fiction,Adventure",
    //         image: "https://images.gr-assets.com/books/1298411339l/34.jpg",
    //       },
    //       {
    //         author: "Louisa May Alcott",
    //         description:
    //           "Generations of readers young and old, male and female, have fallen in love with the March sisters of Louisa May Alcott’s most popular and enduring novel, Little Women. Here are talented tomboy and author-to-be Jo, tragically frail Beth, beautiful Meg, and romantic, spoiled Amy, united in their devotion to each other and their struggles to survive in New England during the Civil War.It is no secret that Alcott based Little Women on her own early life. While her father, the freethinking reformer and abolitionist Bronson Alcott, hobnobbed with such eminent male authors as Emerson, Thoreau, and Hawthorne, Louisa supported herself and her sisters with �woman’s work,” including sewing, doing laundry, and acting as a domestic servant. But she soon discovered she could make more money writing. Little Women brought her lasting fame and fortune, and far from being the �girl’s book” her publisher requested, it explores such timeless themes as love and death, war and peace, the conflict between personal ambition and family responsibilities, and the clash of cultures between Europe and America.",

    //         rating: 4.05,
    //         name: "Little Women",
    //         genre: "Classics,Fiction,Historical,Historical Fiction,Young Adult",
    //         image: "https://images.gr-assets.com/books/1388269517l/1934.jpg",
    //       },
    //       {
    //         author: "Frank McCourt",
    //         description:
    //           "Imbued on every page with Frank McCourt's astounding humor and compassion. This is a glorious book that bears all the marks of a classic.When I look back on my childhood I wonder how I managed to survive at all. It was, of course, a miserable childhood: the happy childhood is hardly worth your while. Worse than the ordinary miserable childhood is the miserable Irish childhood, and worse yet is the miserable Irish Catholic childhood. So begins the Pulitzer Prize winning memoir of Frank McCourt, born in Depression-era Brooklyn to recent Irish immigrants and raised in the slums of Limerick, Ireland. Frank's mother, Angela, has no money to feed the children since Frank's father, Malachy, rarely works, and when he does he drinks his wages. Yet Malachy-- exasperating, irresponsible and beguiling-- does nurture in Frank an appetite for the one thing he can provide: a story. Frank lives for his father's tales of Cuchulain, who saved Ireland, and of the Angel on the Seventh Step, who brings his mother babies. Perhaps it is story that accounts for Frank's survival. Wearing rags for diapers, begging a pig's head for Christmas dinner and gathering coal from the roadside to light a fire, Frank endures poverty, near-starvation and the casual cruelty of relatives and neighbors--yet lives to tell his tale with eloquence, exuberance and remarkable forgiveness. Angela's Ashes, imbued on every page with Frank McCourt's astounding humor and compassion, is a glorious book that bears all the marks of a classic.",

    //         rating: 4.09,
    //         name: "Angela's Ashes",
    //         genre: "Nonfiction,Autobiography,Memoir,Biography",
    //         image: "https://images.gr-assets.com/books/1348317139l/252577.jpg",
    //       },
    //       {
    //         author: "Anthony Burgess",
    //         description:
    //           "A vicious fifteen-year-old droog is the central character of this 1963 classic, whose stark terror was captured in Stanley Kubrick's magnificent film of the same title.In Anthony Burgess's nightmare vision of the future, where criminals take over after dark, the story is told by the central character, Alex, who talks in a brutal invented slang that brilliantly renders his and his friends' social pathology. A Clockwork Orange is a frightening fable about good and evil, and the meaning of human freedom. When the state undertakes to reform Alex—to redeem him—the novel asks, At what cost?This edition includes the controversial last chapter not published in the first edition and Burgess's introduction A Clockwork Orange Resucked.",

    //         rating: 3.99,
    //         name: "A Clockwork Orange",
    //         genre: "Classics,Fiction,Science Fiction,Science Fiction,Dystopia",
    //         image: "https://images.gr-assets.com/books/1348339306l/227463.jpg",
    //       },
    //       {
    //         author: "Frank Herbert",
    //         description:
    //           "Set in the far future amidst a sprawling feudal interstellar empire where planetary dynasties are controlled by noble houses that owe an allegiance to the imperial House Corrino, Dune tells the story of young Paul Atreides (the heir apparent to Duke Leto Atreides and heir of House Atreides) as he and his family accept control of the desert planet Arrakis, the only source of the 'spice' melange, the most important and valuable substance in the cosmos. The story explores the complex, multi-layered interactions of politics, religion, ecology, technology, and human emotion as the forces of the empire confront each other for control of Arrakis.Published in 1965, it won the Hugo Award in 1966 and the inaugural Nebula Award for Best Novel. Dune is frequently cited as the world's best-selling sf novel.",

    //         rating: 4.21,
    //         name: "Dune",
    //         genre: "Science Fiction,Fiction,Fantasy,Classics",
    //         image: "https://images.gr-assets.com/books/1434908555l/234225.jpg",
    //       },
    //       {
    //         author: "Richelle Mead",
    //         description:
    //           "Only a true best friend can protect you from your immortal enemies . . . Lissa Dragomir is a Moroi princess: a mortal vampire with a rare gift for harnessing the earth's magic. She must be protected at all times from Strigoi; the fiercest vampires - the ones who never die. The powerful blend of human and vampire blood that flows through Rose Hathaway, Lissa's best friend, makes her a dhampir. Rose is dedicated to a dangerous life of protecting Lissa from the Strigoi, who are hell-bent on making Lissa one of them.After two years of freedom, Rose and Lissa are caught and dragged back to St. Vladimir's Academy, a school for vampire royalty and their guardians-to-be, hidden in the deep forests of Montana. But inside the iron gates, life is even more fraught with danger . . . and the Strigoi are always close by.Rose and Lissa must navigate their dangerous world, confront the temptations of forbidden love, and never once let their guard down, lest the evil undead make Lissa one of them forever . . .",

    //         rating: 4.13,
    //         name: "Vampire Academy",
    //         genre:
    //           "Young Adult,Paranormal,Vampires,Fantasy,Fantasy,Paranormal,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1381459853l/18660669.jpg",
    //       },
    //       {
    //         author: "Barbara Kingsolver",
    //         description:
    //           "The Poisonwood Bible is a story told by the wife and four daughters of Nathan Price, a fierce, evangelical Baptist who takes his family and mission to the Belgian Congo in 1959. They carry with them everything they believe they will need from home, but soon find that all of it -- from garden seeds to Scripture -- is calamitously transformed on African soil. What follows is a suspenseful epic of one family's tragic undoing and remarkable reconstruction over the course of three decades in postcolonial Africa.",

    //         rating: 4.04,
    //         name: "The Poisonwood Bible",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Cultural,Africa,Classics",
    //         image: "https://images.gr-assets.com/books/1412242487l/7244.jpg",
    //       },
    //       {
    //         author: "Philip Pullman",
    //         description:
    //           "Lyra is rushing to the cold, far North, where witch clans and armored bears rule. North, where the Gobblers take the children they steal--including her friend Roger. North, where her fearsome uncle Asriel is trying to build a bridge to a parallel world.Can one small girl make a difference in such great and terrible endeavors? This is Lyra: a savage, a schemer, a liar, and as fierce and true a champion as Roger or Asriel could want--but what Lyra doesn't know is that to help one of them will be to betray the other.A masterwork of storytelling and suspense, Philip Pullman's award-winning The Golden Compass is the first in the His Dark Materials series, which continues with The Subtle Knife and The Amber Spyglass.",

    //         rating: 3.96,
    //         name: "The Golden Compass",
    //         genre: "Fantasy,Young Adult,Fiction",
    //         image: "https://images.gr-assets.com/books/1505766203l/119322.jpg",
    //       },
    //       {
    //         author: "Ray Bradbury",
    //         description:
    //           "The terrifyingly prophetic novel of a post-literate future.Guy Montag is a fireman. His job is to burn books, which are forbidden, being the source of all discord and unhappiness. Even so, Montag is unhappy; there is discord in his marriage. Are books hidden in his house? The Mechanical Hound of the Fire Department, armed with a lethal hypodermic, escorted by helicopters, is ready to track down those dissidents who defy society to preserve and read books.The classic dystopian novel of a post-literate future, Fahrenheit 451 stands alongside Orwell’s 1984 and Huxley’s Brave New World as a prophetic account of Western civilization’s enslavement by the media, drugs and conformity.Bradbury’s powerful and poetic prose combines with uncanny insight into the potential of technology to create a novel which, decades on from first publication, still has the power to dazzle and shock.--back cover",

    //         rating: 3.98,
    //         name: "Fahrenheit 451",
    //         genre: "Classics,Fiction,Science Fiction,Science Fiction,Dystopia",
    //         image:
    //           "https://images.gr-assets.com/books/1469704347l/17470674.jpg",
    //       },
    //       {
    //         author: "Nicholas Sparks",
    //         description:
    //           "A man with a faded, well-worn notebook open in his lap. A woman experiencing a morning ritual she doesn't understand. Until he begins to read to her. An achingly tender story about the enduring power of love.A man with a faded, well-worn notebook open in his lap. A woman experiencing a morning ritual she doesn't understand. Until he begins to read to her. The Notebook is an achingly tender story about the enduring power of love, a story of miracles that will stay with you forever. Set amid the austere beauty of coastal North Carolina in 1946, The Notebook begins with the story of Noah Calhoun, a rural Southerner returned home from World War II. Noah, thirty-one, is restoring a plantation home to its former glory, and he is haunted by images of the beautiful girl he met fourteen years earlier, a girl he loved like no other. Unable to find her, yet unwilling to forget the summer they spent together, Noah is content to live with only memories...until she unexpectedly returns to his town to see him once again. Allie Nelson, twenty-nine, is now engaged to another man, but realizes that the original passion she felt for Noah has not dimmed with the passage of time. Still, the obstacles that once ended their previous relationship remain, and the gulf between their worlds is too vast to ignore. With her impending marriage only weeks away, Allie is forced to confront her hopes and dreams for the future, a future that only she can shape. Like a puzzle within a puzzle, the story of Noah and Allie is just the beginning. As it unfolds, their tale miraculously becomes something different, with much higher stakes. The result is a deeply moving portrait of love itself, the tender moments and the fundamental changes that affect us all. Shining with a beauty that is rarely found in current literature, The Notebook establishes Nicholas Sparks as a classic storyteller with a unique insight into the only emotion that really matters. I am nothing special, of this I am sure. I am a common man with common thoughts and I've led a common life. There are no monuments dedicated to me and my name will soon be forgotten, but I've loved another with all my heart and soul, and to me, this has always been enough. And so begins one of the most poignant and compelling love stories you will ever read...The Notebook",

    //         rating: 4.07,
    //         name: "The Notebook",
    //         genre: "Romance,Fiction,Womens Fiction,Chick Lit,Contemporary",
    //         image: "https://images.gr-assets.com/books/1385738917l/15931.jpg",
    //       },
    //       {
    //         author: "Ernest Hemingway",
    //         description:
    //           "It is the story of an old Cuban fisherman and his supreme ordeal: a relentless, agonizing battle with a giant marlin far out in the Gulf Stream. Using the simple, powerful language of a fable, Hemingway takes the timeless themes of courage in the face of defeat and personal triumph won from loss and transforms them into a magnificent twentieth-century classic.",

    //         rating: 3.75,
    //         name: "The Old Man and the Sea",
    //         genre:
    //           "Classics,Fiction,Literature,Novels,Literature,American,Academic,School,Adventure,Classics,Classic Literature,Literature,20th Century,Literary Fiction",
    //         image: "https://images.gr-assets.com/books/1329189714l/2165.jpg",
    //       },
    //       {
    //         author: "Charles Dickens",
    //         description:
    //           "See alternate cover edition hereDickens's magnificent novel of guilt, desire, and redemption The orphan Pip’s terrifying encounter with an escaped convict on the Kent marshes, and his mysterious summons to the house of Miss Havisham and her cold, beautiful ward Estella, form the prelude to his “great expectations.” How Pip comes into a fortune, what he does with it, and what he discovers through his secret benefactor are the ingredients of his struggle for moral redemption.",

    //         rating: 3.76,
    //         name: "Great Expectations",
    //         genre: "Classics,Fiction,Literature,Historical,Historical Fiction",
    //         image: "https://images.gr-assets.com/books/1309639398l/2619.jpg",
    //       },
    //       {
    //         author: "Edgar Allan Poe",
    //         description: "",

    //         rating: 4.37,
    //         name: "The Complete Stories and Poems",
    //         genre: "Classics,Poetry,Horror,Fiction,Short Stories",
    //         image: "https://images.gr-assets.com/books/1327942676l/23919.jpg",
    //       },
    //       {
    //         author: "John Irving",
    //         description:
    //           "Eleven-year-old Owen Meany, playing in a Little League baseball game in Gravesend, New Hampshire, hits a foul ball and kills his best friend's mother. Owen doesn't believe in accidents; he believes he is God's instrument. What happens to Owen after that 1953 foul is both extraordinary and terrifying. At moments a comic, self-deluded victim, but in the end the principal, tragic actor in a divine plan, Owen Meany is the most heartbreaking hero John Irving has yet created.",

    //         rating: 4.23,
    //         name: "A Prayer for Owen Meany",
    //         genre: "Fiction,Classics,Literature,Contemporary",
    //         image: "https://images.gr-assets.com/books/1260470010l/4473.jpg",
    //       },
    //       {
    //         author: "Anne Rice",
    //         description:
    //           "This is the story of Louis, as told in his own words, of his journey through mortal and immortal life. Louis recounts how he became a vampire at the hands of the radiant and sinister Lestat and how he became indoctrinated, unwillingly, into the vampire way of life. His story ebbs and flows through the streets of New Orleans, defining crucial moments such as his discovery of the exquisite lost young child Claudia, wanting not to hurt but to comfort her with the last breaths of humanity he has inside. Yet, he makes Claudia a vampire, trapping her womanly passion, will, and intelligence inside the body of a small child. Louis and Claudia form a seemingly unbreakable alliance and even settle down for a while in the opulent French Quarter. Louis remembers Claudia's struggle to understand herself and the hatred they both have for Lestat that sends them halfway across the world to seek others of their kind. Louis and Claudia are desperate to find somewhere they belong, to find others who understand, and someone who knows what and why they are.Louis and Claudia travel Europe, eventually coming to Paris and the ragingly successful Theatre des Vampires - a theatre of vampires pretending to be mortals pretending to be vampires. Here they meet the magnetic and ethereal Armand, who brings them into a whole society of vampires. But Louis and Claudia find that finding others like themselves provides no easy answers and in fact presents dangers they scarcely imagined.",

    //         rating: 3.98,
    //         name: "Interview with the Vampire",
    //         genre:
    //           "Horror,Fantasy,Fiction,Paranormal,Vampires,Fantasy,Paranormal",
    //         image: "https://images.gr-assets.com/books/1380631642l/43763.jpg",
    //       },
    //       {
    //         author: "Anita Diamant",
    //         description:
    //           "Her name is Dinah. In the Bible, her life is only hinted at in a brief and violent detour within the more familiar chapters of the Book of Genesis that are about her father, Jacob, and his dozen sons. Told in Dinah's voice, this novel reveals the traditions and turmoils of ancient womanhood--the world of the red tent. It begins with the story of her mothers--Leah, Rachel, Zilpah, and Bilhah--the four wives of Jacob. They love Dinah and give her gifts that sustain her through a hard-working youth, a calling to midwifery, and a new home in a foreign land. Dinah's story reaches out from a remarkable period of early history and creates an intimate connection with the past. Deeply affecting, The Red Tent combines rich storytelling with a valuable achievement in modern fiction: a new view of biblical women's society.",

    //         rating: 4.16,
    //         name: "The Red Tent",
    //         genre: "Historical,Historical Fiction,Fiction,Christian,Literature",
    //         image: "https://images.gr-assets.com/books/1405739117l/4989.jpg",
    //       },
    //       {
    //         author: "Sue Monk Kidd",
    //         description:
    //           "Set in South Carolina in 1964, The Secret Life of Bees tells the story of Lily Owens, whose life has been shaped around the blurred memory of the afternoon her mother was killed. When Lily's fierce-hearted black stand-in mother, Rosaleen, insults three of the deepest racists in town, Lily decides to spring them both free. They escape to Tiburon, South Carolina--a town that holds the secret to her mother's past. Taken in by an eccentric trio of black beekeeping sisters, Lily is introduced to their mesmerizing world of bees and honey, and the Black Madonna. This is a remarkable novel about divine female power, a story women will share and pass on to their daughters for years to come.",

    //         rating: 4.03,
    //         name: "The Secret Life of Bees",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Young Adult,Adult Fiction",
    //         image: "https://images.gr-assets.com/books/1473454532l/37435.jpg",
    //       },
    //       {
    //         author: "Cassandra Clare",
    //         description:
    //           "In a time when Shadowhunters are barely winning the fight against the forces of darkness, one battle will change the course of history forever. Welcome to the Infernal Devices trilogy, a stunning and dangerous prequel to the New York Times bestselling Mortal Instruments series.The year is 1878. Tessa Gray descends into London’s dark supernatural underworld in search of her missing brother. She soon discovers that her only allies are the demon-slaying Shadowhunters—including Will and Jem, the mysterious boys she is attracted to. Soon they find themselves up against the Pandemonium Club, a secret organization of vampires, demons, warlocks, and humans. Equipped with a magical army of unstoppable clockwork creatures, the Club is out to rule the British Empire, and only Tessa and her allies can stop them...",

    //         rating: 4.33,
    //         name: "Clockwork Angel",
    //         genre:
    //           "Fantasy,Young Adult,Fantasy,Paranormal,Science Fiction,Steampunk,Romance",
    //         image: "https://images.gr-assets.com/books/1454962884l/7171637.jpg",
    //       },
    //       {
    //         author: "Jeffrey Eugenides",
    //         description:
    //           "Middlesex tells the breathtaking story of Calliope Stephanides, and three generations of the Greek-American Stephanides family, who travel from a tiny village overlooking Mount Olympus in Asia Minor to Prohibition-era Detroit, witnessing its glory days as the Motor City and the race riots of 1967 before moving out to the tree-lined streets of suburban Grosse Pointe, Michigan. To understand why Calliope is not like other girls, she has to uncover a guilty family secret, and the astonishing genetic history that turns Callie into Cal, one of the most audacious and wondrous narrators in contemporary fiction. Lyrical and thrilling, Middlesex is an exhilarating reinvention of the American epic.",

    //         rating: 3.99,
    //         name: "Middlesex",
    //         genre: "Fiction,Historical,Historical Fiction,Contemporary",
    //         image: "https://images.gr-assets.com/books/1437029776l/2187.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.©1977 Stephen King; (P)2005 Random House Audio",

    //         rating: 4.19,
    //         name: "The Shining",
    //         genre: "Horror,Fiction,Thriller",
    //         image: "https://images.gr-assets.com/books/1353277730l/11588.jpg",
    //       },
    //       {
    //         author: "Jack Kerouac",
    //         description:
    //           "When Jack Kerouac’s On the Road first appeared in 1957, readers instantly felt the beat of a new literary rhythm. A fictionalised account of his own journeys across America with his friend Neal Cassady, Kerouac’s beatnik odyssey captured the soul of a generation and changed the landscape of American fiction for ever.Influenced by Jack London and Thomas Wolfe, Kerouac always wanted to be a writer, but his true voice only emerged when he wrote about his own experiences in On the Road. Leaving a broken marriage behind him, Sal Paradise (Kerouac) joins Dean Moriarty (Cassady), a tearaway and former reform school boy, on a series of journeys that takes them from New York to San Francisco, then south to Mexico. Hitching rides and boarding buses, they enter a world of hobos and drifters, fruit-pickers and migrant families, small towns and wide horizons. Adrift from conventional society, they experience America in the raw: a place where living is hard, but ‘life is holy and every moment is precious’.With its smoky, jazz-filled atmosphere and its restless, yearning spirit of adventure, On the Road left its mark on the culture of the late 20th century, influencing countless books, films and songs. Kerouac’s prose is remarkable both for its colloquial swing and for the pure lyricism inspired by the American landscape – ‘the backroads, the black-tar roads that curve among the mournful rivers like Susquehanna, Monongahela, old Potomac and Monocacy’. This Folio Society edition is illustrated with evocative photographs of Kerouac and the landscapes of 1950s America. Now acknowledged as a modern classic, On the Road remains a thrilling and poignant story of the road less travelled.",

    //         rating: 3.63,
    //         name: "On the Road",
    //         genre: "Classics,Fiction,Travel,Literature",
    //         image: "https://images.gr-assets.com/books/1413588576l/70401.jpg",
    //       },
    //       {
    //         author: "Christopher Paolini",
    //         description:
    //           "Eragon and the fledgling dragon must navigate the dangerous terrain and dark enemies of an empire ruled by a king whose evil knows no bounds. Can Eragon take up the mantle of the legendary Dragon Riders?When Eragon finds a polished blue stone in the forest, he thinks it is the lucky discovery of a poor farm boy; perhaps it will buy his family meat for the winter. But when the stone brings a dragon hatchling, Eragon realizes he has stumbled upon a legacy nearly as old as the Empire itself. Overnight his simple life is shattered, and he is thrust into a perilous new world of destiny, magic, and power. With only an ancient sword and the advice of an old storyteller for guidance, Eragon and the fledgling dragon must navigate the dangerous terrain and dark enemies of an Empire ruled by a king whose evil knows no bounds. Can Eragon take up the mantle of the legendary Dragon Riders? The fate of the Empire may rest in his hands. . . .",

    //         rating: 3.88,
    //         name: "Eragon",
    //         genre: "Fantasy,Young Adult,Fiction,Fantasy,Dragons",
    //         image: "https://images.gr-assets.com/books/1366212852l/113436.jpg",
    //       },
    //       {
    //         author: "Eric Carle",
    //         description:
    //           "THE all-time classic picture book, from generation to generation, sold somewhere in the world every 30 seconds! Have you shared it with a child or grandchild in your life?Including a special feature, dye cuts, this beautiful board book edition, perfect for teaching the days of the week, offers readers an interactive experience.",

    //         rating: 4.29,
    //         name: "The Very Hungry Caterpillar",
    //         genre: "Childrens,Picture Books,Childrens",
    //         image: "https://images.gr-assets.com/books/1517550266l/4948.jpg",
    //       },
    //       {
    //         author: "Daniel Keyes",
    //         description:
    //           "The story of a mentally disabled man whose experimental quest for intelligence mirrors that of Algernon, an extraordinary lab mouse. In diary entries, Charlie tells how a brain operation increases his IQ and changes his life. As the experimental procedure takes effect, Charlie's intelligence expands until it surpasses that of the doctors who engineered his metamorphosis. The experiment seems to be a scientific breakthrough of paramount importance--until Algernon begins his sudden, unexpected deterioration. Will the same happen to Charlie?",

    //         rating: 4.09,
    //         name: "Flowers for Algernon",
    //         genre: "Fiction,Classics,Science Fiction,Young Adult",
    //         image: "https://images.gr-assets.com/books/1367141311l/18373.jpg",
    //       },
    //       {
    //         author: "Patrick Rothfuss",
    //         description:
    //           "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen. The intimate narrative of his childhood in a troupe of traveling players, his years spent as a near-feral orphan in a crime-ridden city, his daringly brazen yet successful bid to enter a legendary school of magic, and his life as a fugitive after the murder of a king form a gripping coming-of-age story unrivaled in recent literature. A high-action story written with a poet's hand, The Name of the Wind is a masterpiece that will transport readers into the body and mind of a wizard.",

    //         rating: 4.55,
    //         name: "The Name of the Wind",
    //         genre: "Fantasy,Fiction,Fantasy,Epic Fantasy",
    //         image: "https://images.gr-assets.com/books/1515589515l/186074.jpg",
    //       },
    //       {
    //         author: "John Green",
    //         description:
    //           "Before. Miles “Pudge” Halter is done with his safe life at home. His whole life has been one big non-event, and his obsession with famous last words has only made him crave “the Great Perhaps” even more (Francois Rabelais, poet). He heads off to the sometimes crazy and anything-but-boring world of Culver Creek Boarding School, and his life becomes the opposite of safe. Because down the hall is Alaska Young. The gorgeous, clever, funny, sexy, self-destructive, screwed up, and utterly fascinating Alaska Young. She is an event unto herself. She pulls Pudge into her world, launches him into the Great Perhaps, and steals his heart. Then. . . . After. Nothing is ever the same.",

    //         rating: 4.06,
    //         name: "Looking for Alaska",
    //         genre: "Young Adult,Fiction,Contemporary,Romance",
    //         image: "https://images.gr-assets.com/books/1394798630l/99561.jpg",
    //       },
    //       {
    //         author: "Mark Haddon",
    //         description:
    //           "Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions. He cannot stand to be touched. And he detests the color yellow.Although gifted with a superbly logical brain, for fifteen-year-old Christopher everyday interactions and admonishments have little meaning. He lives on patterns, rules, and a diagram kept in his pocket. Then one day, a neighbor's dog, Wellington, is killed and his carefully constructive universe is threatened. Christopher sets out to solve the murder in the style of his favourite (logical) detective, Sherlock Holmes. What follows makes for a novel that is funny, poignant and fascinating in its portrayal of a person whose curse and blessing are a mind that perceives the world entirely literally.",

    //         rating: 3.86,
    //         name: "The Curious Incident of the Dog in the Night-Time",
    //         genre: "Fiction,Mystery,Young Adult,Contemporary",
    //         image: "https://images.gr-assets.com/books/1479863624l/1618.jpg",
    //       },
    //       {
    //         author: "Becca Fitzpatrick",
    //         description:
    //           "A SACRED OATHA FALLEN ANGELA FORBIDDEN LOVERomance was not part of Nora Grey's plan. She's never been particularly attracted to the boys at her school, no matter how hard her best friend, Vee, pushes them at her. Not until Patch comes along. With his easy smile and eyes that seem to see inside her, Patch draws Nora to him against her better judgment.But after a series of terrifying encounters, Nora's not sure whom to trust. Patch seems to be everywhere she is and seems to know more about her than her closest friends. She can't decide whether she should fall into his arms or run and hide. And when she tries to seek some answers, she finds herself near a truth that is way more unsettling than anything Patch makes her feel.For she is right in the middle of an ancient battle between the immortal and those that have fallen - and, when it comes to choosing sides, the wrong choice will cost Nora her life.",

    //         rating: 3.99,
    //         name: "Hush, Hush",
    //         genre:
    //           "Young Adult,Fantasy,Fantasy,Paranormal,Paranormal,Angels,Romance",
    //         image: "https://images.gr-assets.com/books/1358261334l/6339664.jpg",
    //       },
    //       {
    //         author: "Mitch Albom",
    //         description:
    //           "From the author of the phenomenal #1 New York Times bestseller Tuesdays with Morrie, a novel that explores the unexpected connections of our lives, and the idea that heaven is more than a place; it's an answer. Eddie is a wounded war veteran, an old man who has lived, in his mind, an uninspired life. His job is fixing rides at a seaside amusement park. On his 83rd birthday, a tragic accident kills him as he tries to save a little girl from a falling cart. He awakes in the afterlife, where he learns that heaven is not a destination. It's a place where your life is explained to you by five people, some of whom you knew, others who may have been strangers. One by one, from childhood to soldier to old age, Eddie's five people revisit their connections to him on earth, illuminating the mysteries of his meaningless life, and revealing the haunting secret behind the eternal question: Why was I here?",

    //         rating: 3.91,
    //         name: "The Five People You Meet in Heaven",
    //         genre: "Fiction,Inspirational,Contemporary,Fantasy",
    //         image: "https://images.gr-assets.com/books/1388200541l/3431.jpg",
    //       },
    //       {
    //         author: "Truman Capote",
    //         description:
    //           "On November 15, 1959, in the small town of Holcomb, Kansas, four members of the Clutter family were savagely murdered by blasts from a shotgun held a few inches from their faces. There was no apparent motive for the crime, and there were almost no clues. As Truman Capote reconstructs the murder and the investigation that led to the capture, trial, and execution of the killers, he generates both mesmerizing suspense and astonishing empathy. In Cold Blood is a work that transcends its moment, yielding poignant insights into the nature of American violence.",

    //         rating: 4.06,
    //         name: "In Cold Blood",
    //         genre: "Nonfiction,Classics,Crime,True Crime,Mystery,Crime,Mystery",
    //         image: "https://images.gr-assets.com/books/1424931136l/168642.jpg",
    //       },
    //       {
    //         author: "Larry McMurtry",
    //         description:
    //           "A love story, an adventure, and an epic of the frontier, Larry McMurtry’s Pulitzer Prize— winning classic, Lonesome Dove, the third book in the Lonesome Dove tetralogy, is the grandest novel ever written about the last defiant wilderness of America.Journey to the dusty little Texas town of Lonesome Dove and meet an unforgettable assortment of heroes and outlaws, whores and ladies, Indians and settlers. Richly authentic, beautifully written, always dramatic, Lonesome Dove is a book to make us laugh, weep, dream, and remember.Series in order of publication:Lonesome Dove (1985)Streets of Laredo (1993)Dead Man's Walk (1995)Comanche Moon (1997)Series in order of internal chronology:Dead Man's Walk – set in the early 1840sComanche Moon – set in the 1850–60sLonesome Dove – set in mid-to-late 1870sStreets of Laredo – set in the early 1890s",

    //         rating: 4.48,
    //         name: "Lonesome Dove",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Westerns,Classics,Historical",
    //         image: "https://images.gr-assets.com/books/1378573063l/256008.jpg",
    //       },
    //       {
    //         author: "Frank Herbert",
    //         description:
    //           "Here is the novel that will be forever considered a triumph of the imagination. Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He would avenge the traitorous plot against his noble family--and would bring to fruition humankind's most ancient and unattainable dream.A stunning blend of adventure and mysticism, environmentalism and politics, Dune won the first Nebula Award, shared the Hugo Award, and formed the basis of what it undoubtedly the grandest epic in science fiction.",

    //         rating: 4.21,
    //         name: "Dune",
    //         genre: "Science Fiction,Fiction,Fantasy,Classics",
    //         image: "https://images.gr-assets.com/books/1388175949l/104.jpg",
    //       },
    //       {
    //         author: "Reduced Shakespeare Company",
    //         description:
    //           "Revised from the rather long original complete works of Shakespeare, this abridged version is written by three Americans, with no qualifications worth speaking of. The playtext is reproduced here with footnotes which will be of no help to anyone and a letter from the authors to the Queen.",

    //         rating: 4.47,
    //         name: "The Compleat Works of Wllm Shkspr (abridged)",
    //         genre: "Plays,Classics,Humor,Fiction,Drama,Plays,Theatre",
    //         image: "https://images.gr-assets.com/books/1347579233l/1423.jpg",
    //       },
    //       {
    //         author: "C.S. Lewis",
    //         description:
    //           "They open a door and enter a world NARNIA...the land beyond the wardrobe, the secret country known only to Peter, Susan, Edmund, and Lucy...the place where the adventure begins. Lucy is the first to find the secret of the wardrobe in the professor's mysterious old house. At first, no one believes her when she tells of her adventures in the land of Narnia. But soon Edmund and then Peter and Susan discover the Magic and meet Aslan, the Great Lion, for themselves. In the blink of an eye, their lives are changed forever.",

    //         rating: 4.2,
    //         name: "The Lion, the Witch and the Wardrobe",
    //         genre: "Fantasy,Classics,Fiction,Young Adult,Childrens",
    //         image: "https://images.gr-assets.com/books/1353029077l/100915.jpg",
    //       },
    //       {
    //         author: "Richelle Mead",
    //         description:
    //           "WHAT IF FOLLOWING HER HEART MEANS ROSE COULD LOSE HER BEST FRIEND FOREVER?Lissa Dragomir is a Moroi princess: a mortal vampire with a rare gift for harnessing the earth's magic. She must be protected at all times from Strigoi; the fiercest vampires - the ones who never die. The powerful blend of human and vampire blood that flows through Rose Hathaway, Lissa's best friend, makes her a Dhampir. Rose is dedicated to a dangerous life of protecting Lissa from the Strigoi, who are hell-bent on making Lissa one of them.Rose knows it is forbidden to love another guardian. Her best friend, Lissa - the last Dragomir princess - must always come first. Unfortunately, when it comes to gorgeous Dimitri Belikov, some rules are meant to be broken...Then a strange darkness begins to grow in Rose's mind, and ghostly shadows warn of a terrible evil drawing nearer to the Academy's iron gates. The immortal undead are closing in, and they want vengeance for the lives Rose has stolen. In a heart-stopping battle to rival her worst nightmares, Rose will have to choose between life, love, and the two people who matter most... but will her choice mean that only one can survive?",

    //         rating: 4.37,
    //         name: "Shadow Kiss",
    //         genre:
    //           "Young Adult,Paranormal,Vampires,Fantasy,Fantasy,Paranormal,Romance",
    //         image: "https://images.gr-assets.com/books/1361099049l/2802316.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "Welcome to Derry, Maine ...It’s a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real ...They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But none of them can withstand the force that has drawn them back to Derry to face the nightmare without an end, and the evil without a name.",

    //         rating: 4.22,
    //         name: "It",
    //         genre: "Horror,Fiction,Fantasy",
    //         image: "https://images.gr-assets.com/books/1334416842l/830502.jpg",
    //       },
    //       {
    //         author: "Rick Riordan",
    //         description:
    //           "All year the half-bloods have been preparing for battle against the Titans, knowing the odds of a victory are grim. Kronos’s army is stronger than ever, and with every god and half-blood he recruits, the evil Titan’s power only grows. While the Olympians struggle to contain the rampaging monster Typhon, Kronos begins his advance on New York City, where Mount Olympus stands virtually unguarded. Now it’s up to Percy Jackson and an army of young demigods to stop the Lord of Time.In this momentous final book in the New York Times best-selling series, the long-awaited prophecy surrounding Percy’s sixteenth birthday unfolds. And as the battle for Western civilization rages on the streets of Manhattan, Percy faces a terrifying suspicion that he may be fighting against his own fate.",

    //         rating: 4.5,
    //         name: "The Last Olympian",
    //         genre: "Fantasy,Young Adult,Fantasy,Mythology",
    //         image: "https://images.gr-assets.com/books/1327924597l/4502507.jpg",
    //       },
    //       {
    //         author: "Nicholas Sparks",
    //         description:
    //           "Every April, when the wind blows from the sea and mingles with the scent of lilacs, Landon Carter remembers his last year at Beaufort High. It was 1958, and Landon had already dated a girl or two. He even swore that he had once been in love. Certainly the last person in town he thought he'd fall for was Jamie Sullivan, the daughter of the town's Baptist minister. A quiet girl who always carried a Bible with her schoolbooks, Jamie seemed content living in a world apart from the other teens. She took care of her widowed father, rescued hurt animals, and helped out at the local orphanage. No boy had ever asked her out. Landon would never have dreamed of it. Then a twist of fate made Jamie his partner for the homecoming dance, and Landon Carter's life would never be the same. Being with Jamie would show him the depths of the human heart and lead him to a decision so stunning it would send him irrevocably on the road to manhood...Did You Know?-That Jamie was named after Nicholas's editor, Jamie Raab?That Landon is the name of his third son?That Nicholas Sparks recorded his own reading for the audio version of the novel?",

    //         rating: 4.16,
    //         name: "A Walk to Remember",
    //         genre:
    //           "Romance,Fiction,Womens Fiction,Chick Lit,Young Adult,Contemporary",
    //         image: "https://images.gr-assets.com/books/1385738968l/3473.jpg",
    //       },
    //       {
    //         author: "E.L. James",
    //         description:
    //           "When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms. Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates. For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.Erotic, amusing, and deeply moving, the Fifty Shades Trilogy is a tale that will obsess you, possess you, and stay with you forever.This book is intended for mature audiences.",

    //         rating: 3.66,
    //         name: "Fifty Shades of Grey",
    //         genre: "Romance,Fiction,Adult Fiction,Erotica,Adult,Erotica,Bdsm",
    //         image:
    //           "https://images.gr-assets.com/books/1385207843l/10818853.jpg",
    //       },
    //       {
    //         author: "Jean M. Auel",
    //         description:
    //           "This novel of awesome beauty and power is a moving saga about people, relationships, and the boundaries of love. Through Jean M. Auel's magnificent storytelling we are taken back to the dawn of modern humans, and with a girl named Ayla we are swept up in the harsh and beautiful Ice Age world they shared with the ones who called themselves the Clan of the Cave Bear. A natural disaster leaves the young girl wandering alone in an unfamiliar and dangerous land until she is found by a woman of the Clan, people very different from her own kind. To them, blond, blue-eyed Ayla looks peculiar and ugly--she is one of the Others, those who have moved into their ancient homeland; but Iza cannot leave the girl to die and takes her with them. Iza and Creb, the old Mog-ur, grow to love her, and as Ayla learns the ways of the Clan and Iza's way of healing, most come to accept her. But the brutal and proud youth who is destined to become their next leader sees her differences as a threat to his authority. He develops a deep and abiding hatred for the strange girl of the Others who lives in their midst, and is determined to get his revenge.",

    //         rating: 4.03,
    //         name: "The Clan of the Cave Bear",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,Fantasy,Historical,Classics,Romance,Adventure,Historical Fiction,Prehistoric,Adult,Adult Fiction",
    //         image: "https://images.gr-assets.com/books/1385331302l/1295.jpg",
    //       },
    //       {
    //         author: "James Dashner",
    //         description:
    //           "There are alternate cover editions for this ASIN here and here.If you ain’t scared, you ain’t human.When Thomas wakes up in the lift, the only thing he can remember is his name. He’s surrounded by strangers—boys whose memories are also gone.Nice to meet ya, shank. Welcome to the Glade.Outside the towering stone walls that surround the Glade is a limitless, ever-changing maze. It’s the only way out—and no one’s ever made it through alive.Everything is going to change.Then a girl arrives. The first girl ever. And the message she delivers is terrifying.Remember. Survive. Run.",

    //         rating: 4.03,
    //         name: "The Maze Runner",
    //         genre: "Young Adult,Science Fiction,Dystopia,Science Fiction",
    //         image: "https://images.gr-assets.com/books/1375596592l/6186357.jpg",
    //       },
    //       {
    //         author: "Ernest Hemingway",
    //         description:
    //           "David Copperfield is the story of a young man’s adventures on his journey from an unhappy and impoverished childhood to the discovery of his vocation as a successful novelist. Among the gloriously vivid cast of characters he encounters are his tyrannical stepfather, Mr. Murdstone; his formidable aunt, Betsey Trotwood; the eternally humble yet treacherous Uriah Heep; frivolous, enchanting Dora; and the magnificently impecunious Micawber, one of literature’s great comic creations.In David Copperfield—the novel he described as his “favorite child”—Dickens drew revealingly on his own experiences to create one of his most exuberant and enduringly popular works, filled with tragedy and comedy in equal measure.",

    //         rating: 3.79,
    //         name: "A Farewell to Arms",
    //         genre:
    //           "Classics,Fiction,Historical,Historical Fiction,War,Literature",
    //         image: "https://images.gr-assets.com/books/1313714836l/10799.jpg",
    //       },
    //       {
    //         author: "Jay Asher",
    //         description:
    //           "An alternate cover for this isbn can be found here.Here is the third volume in George R.R. Martin's magnificent cycle of novels that includes A Game of Thrones and A Clash of Kings. Together, this series comprises a genuine masterpiece of modern fantasy, destined to stand as one of the great achievements of imaginative fiction.Of the five contenders for power, one is dead, another in disfavor, and still the wars rage as alliances are made and broken. Joffrey sits on the Iron Throne, the uneasy ruler of the Seven Kingdoms. His most bitter rival, Lord Stannis, stands defeated and disgraced, victim of the sorceress who holds him in her thrall. Young Robb still rules the North from the fortress of Riverrun. Meanwhile, making her way across a blood-drenched continent is the exiled queen, Daenerys, mistress of the only three dragons still left in the world. And as opposing forces manoeuver for the final showdown, an army of barbaric wildlings arrives from the outermost limits of civilization, accompanied by a horde of mythical Others—a supernatural army of the living dead whose animated corpses are unstoppable. As the future of the land hangs in the balance, no one will rest until the Seven Kingdoms have exploded in a veritable storm of swords...",

    //         rating: 3.98,
    //         name: "Thirteen Reasons Why",
    //         genre: "Young Adult,Contemporary,Fiction,Realistic Fiction",
    //         image: "https://images.gr-assets.com/books/1333822506l/1217100.jpg",
    //       },
    //       {
    //         author: "George R.R. Martin",
    //         description:
    //           "Librarian's note: An alternate cover edition can be found hereA bold English adventurer. An invincible Japanese warlord. A beautiful woman torn between two ways of life, two ways of love. All brought together in an extraordinary saga of a time and a place aflame with conflict, passion, ambition, lust, and the struggle for power...",

    //         rating: 4.54,
    //         name: "A Storm of Swords",
    //         genre:
    //           "Fantasy,Fiction,Fantasy,Epic Fantasy,Science Fiction Fantasy",
    //         image: "https://images.gr-assets.com/books/1497931121l/62291.jpg",
    //       },
    //       {
    //         author: "James Clavell",
    //         description:
    //           "Two sisters competing for the greatest prize: The love of a kingWhen Mary Boleyn comes to court as an innocent girl of fourteen, she catches the eye of Henry VIII. Dazzled, Mary falls in love with both her golden prince and her growing role as unofficial queen. However, she soon realises just how much she is a pawn in her family's ambitious plots as the king's interest begins to wane and she is forced to step aside for her best friend and rival: her sister, Anne. Then Mary knows that she must defy her family and her king and take fate into her own hands.A rich and compelling novel of love, sex, ambition, and intrigue, The Other Boleyn Girl introduces a woman of extraordinary determination and desire who lived at the heart of the most exciting and glamourous court in Europe and survived by following her heart.",

    //         rating: 4.38,
    //         name: "Shōgun",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,Cultural,Japan,Historical,Classics",
    //         image: "https://images.gr-assets.com/books/1397228842l/402093.jpg",
    //       },
    //       {
    //         author: "Philippa Gregory",
    //         description:
    //           "Nine-year-old Oskar Schell is an inventor, amateur entomologist, Francophile, letter writer, pacifist, natural historian, percussionist, romantic, Great Explorer, jeweller, detective, vegan, and collector of butterflies. When his father is killed in the September 11th attacks on the World Trade Centre, Oskar sets out to solve the mystery of a key he discovers in his father's closet. It is a search which leads him into the lives of strangers, through the five boroughs of New York, into history, to the bombings of Dresden and Hiroshima, and on an inward journey which brings him ever closer to some kind of peace.",

    //         rating: 4.05,
    //         name: "The Other Boleyn Girl",
    //         genre: "Historical,Historical Fiction,Fiction,Historical,Romance",
    //         image: "https://images.gr-assets.com/books/1355932638l/37470.jpg",
    //       },
    //       {
    //         author: "Jonathan Safran Foer",
    //         description:
    //           "In the shadow of Auschwitz, a flamboyant German industrialist grew into a living legend to the Jews of Cracow. He was a womaniser, a heavy drinker and a bon viveur, but to them he became a saviour. This is the extraordinary story of Oskar Schindler, who risked his life to protect Jews in Nazi-occupied Poland and who was transformed by the war into a man with a mission, a compassionate angel of mercy.",

    //         rating: 3.97,
    //         name: "Extremely Loud and Incredibly Close",
    //         genre: "Fiction,Contemporary,Historical,Historical Fiction",
    //         image: "https://images.gr-assets.com/books/1327879967l/4588.jpg",
    //       },
    //       {
    //         author: "Richelle Mead",
    //         description:
    //           "What if the person you were meant to be with could never be yours?17-year-old Lucinda falls in love with a gorgeous, intelligent boy, Daniel, at her new school, the grim, foreboding Sword & Cross . . . only to find out that Daniel is a fallen angel, and that they have spent lifetimes finding and losing one another as good & evil forces plot to keep them apart. Get ready to fall . . .",

    //         rating: 4.41,
    //         name: "Last Sacrifice",
    //         genre:
    //           "Young Adult,Paranormal,Vampires,Fantasy,Fantasy,Paranormal,Romance",
    //         image: "https://images.gr-assets.com/books/1319850978l/6527740.jpg",
    //       },
    //       {
    //         author: "Lauren Kate",
    //         description:
    //           "The Golden Compass, The Subtle Knife, and The Amber Spyglass are available together in one volume perfect for any fan or newcomer to this modern fantasy classic series.These thrilling adventures tell the story of Lyra and Will—two ordinary children on a perilous journey through shimmering haunted otherworlds. They will meet witches and armored bears, fallen angels and soul-eating specters. And in the end, the fate of both the living—and the dead—will rely on them.Phillip Pullman’s spellbinding His Dark Materials trilogy has captivated readers for over twenty years and won acclaim at every turn. It will have you questioning everything you know about your world and wondering what really lies just out of reach.",

    //         rating: 3.73,
    //         name: "Fallen",
    //         genre:
    //           "Young Adult,Fantasy,Paranormal,Angels,Fantasy,Paranormal,Romance",
    //         image: "https://images.gr-assets.com/books/1440619649l/6487308.jpg",
    //       },
    //       {
    //         author: "Ernest Hemingway",
    //         description:
    //           "Raised like sisters, Mariamne and Salome are indulged with riches, position, and learning-a rare thing for females in Jerusalem. But Mariamne has a further gift: an illness has left her with visions; she has the power of prophecy. It is her prophesying that drives the two girls to flee to Egypt, where they study philosophy, mathematics, and astronomy in the Great Library of Alexandria.After seven years they return to a Judaea where many now believe John the Baptizer is the messiah. Salome too begins to believe, but Mariamne, now called Magdalene, is drawn to his cousin, Yeshu’a, a man touched by the divine in the same way she was during her days of illness. Together they speak of sharing their direct experience of God; but Yeshu’a unexpectedly gains a reputation as a healer, and as the ill and the troubled flock to him, he and Magdalene are forced to make a terrible decision.This radical retelling of the greatest story ever told brings Mary Magdalene to life-not as a prostitute or demon-possessed-but as an educated woman who was truly the “apostle to the apostles.”From the Hardcover edition.",

    //         rating: 3.82,
    //         name: "The Sun Also Rises",
    //         genre: "Classics,Fiction,Literature,Novels",
    //         image: "https://images.gr-assets.com/books/1509802323l/3876.jpg",
    //       },
    //       {
    //         author: "Ki Longfellow",
    //         description:
    //           "After a long and heartbreaking journey to Dimitri’s birthplace in Siberia, Rose Hathaway has finally returned to St. Vladimir’s—and to her best friend, Lissa. It is nearly graduation, and the girls can’t wait for their real lives beyond the Academy’s iron gates to begin. But Rose’s heart still aches for Dimitri, and she knows he’s out there, somewhere.",

    //         rating: 4.21,
    //         name: "The Secret Magdalene",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,Religion,Historical,Spirituality,Literature,Biblical Fiction,Biblical,Book Club,Adult",
    //         image: "https://images.gr-assets.com/books/1175446011l/514811.jpg",
    //       },
    //       {
    //         author: "Richelle Mead",
    //         description:
    //           "An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind’s most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price. Until something goes wrong. . . .",

    //         rating: 4.36,
    //         name: "Spirit Bound",
    //         genre:
    //           "Young Adult,Fantasy,Paranormal,Fantasy,Paranormal,Vampires,Romance",
    //         image: "https://images.gr-assets.com/books/1291168967l/6479259.jpg",
    //       },
    //       {
    //         author: "John Boyne",
    //         description:
    //           "Nursery magic is very strange and wonderful, and only those playthings that are old and wise and experienced like the Skin Horse understand all about it.Like the Skin Horse, Margery Williams understood how toys--and people--become real through the wisdom and experience of love. This reissue of a favorite classic, with the original story and illustrations as they first appeared in 1922, will work its magic for all who read it.",

    //         rating: 4.12,
    //         name: "The Boy in the Striped Pajamas",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,Young Adult,Historical,World War II,Holocaust",
    //         image: "https://images.gr-assets.com/books/1366228171l/39999.jpg",
    //       },
    //       {
    //         author: "Toni Morrison",
    //         description:
    //           "The story of the creation of the world and of the First Age, this is the ancient drama to which the characters in The Lord of the Rings look back and in whose events some of them, such as Elrond and Galadriel, took part. The three Silmarils were jewels created by Fëanor, most gifted of the Elves. Within them was imprisoned the Light of the Two Trees of Valinor before the Trees themselves were destroyed by Morgoth, the first Dark Lord. Thereafter, the unsullied Light of Valinor lived on only in the Silmarils, but they were seized by Morgoth and set in his crown, which was guarded in the impenetrable fortress of Angband in the north of Middle-earth. The Silmarillion is the history of the rebellion of Fëanor and his kindred against the gods, their exile from Valinor and return to Middle-earth, and their war, hopeless despite all their heroism, against the great Enemy.",

    //         rating: 3.79,
    //         name: "Beloved",
    //         genre:
    //           "Fiction,Classics,Historical,Historical Fiction,Literature,Magical Realism",
    //         image: "https://images.gr-assets.com/books/1347984578l/6149.jpg",
    //       },
    //       {
    //         author: "Agatha Christie",
    //         description:
    //           "Told with deadpan humour and bitter irony, Kurt Vonnegut's cult tale of global destruction preys on our deepest fears of witnessing Armageddon and, worse still, surviving it ...Dr Felix Hoenikker, one of the founding 'fathers' of the atomic bomb, has left a deadly legacy to the world. For he's the inventor of 'ice-nine', a lethal chemical capable of freezing the entire planet. The search for its whereabouts leads to Hoenikker's three ecentric children, to a crazed dictator in the Caribbean, to madness. Felix Hoenikker's Death Wish comes true when his last, fatal gift to humankind brings about the end, that for all of us, is nigh...",

    //         rating: 4.16,
    //         name: "Murder on the Orient Express",
    //         genre: "Mystery,Classics,Fiction,Mystery,Crime",
    //         image: "https://images.gr-assets.com/books/1388267702l/16304.jpg",
    //       },
    //       {
    //         author: "Kurt Vonnegut",
    //         description:
    //           "I believe that the reader will discover here the essential nature of one of the strangest and most awful chapters in human history, Arthur Miller wrote of his classic play about the witch-hunts and trials in seventeenth-century Salem, Massachusetts. Based on historical people and real events, Miller's drama is a searing portrait of a community engulfed by hysteria. In the rigid theocracy of Salem, rumors that women are practicing witchcraft galvanize the town's most basic fears and suspicions; and when a young girl accuses Elizabeth Proctor of being a witch, self-righteous church leaders and townspeople insist that Elizabeth be brought to trial. The ruthlessness of the prosecutors and the eagerness of neighbor to testify against neighbor brilliantly illuminate the destructive power of socially sanctioned violence.Written in 1953, The Crucible is a mirror Miller uses to reflect the anti-communist hysteria inspired by Senator Joseph McCarthy's witch-hunts in the United States. Within the text itself, Miller contemplates the parallels, writing, Political opposition... is given an inhumane overlay, which then justifies the abrogation of all normally applied customs of civilized behavior. A political policy is equated with moral right, and opposition to it with diabolical malevolence.WIth an introduction by Christopher Bigsby.",

    //         rating: 4.17,
    //         name: "Cat's Cradle",
    //         genre: "Fiction,Classics,Science Fiction,Humor,Literature",
    //         image: "https://images.gr-assets.com/books/1327867150l/135479.jpg",
    //       },
    //       {
    //         author: "Tracy Chevalier",
    //         description:
    //           "For years, Grace has watched the wolves in the woods behind her house. One yellow-eyed wolf—her wolf—is a chilling presence she can't seem to live without.Meanwhile, Sam has lived two lives: In winter, the frozen woods, the protection of the pack, and the silent company of a fearless girl. In summer, a few precious months of being human… until the cold makes him shift back again.Now, Grace meets a yellow-eyed boy whose familiarity takes her breath away. It's her wolf. It has to be. But as winter nears, Sam must fight to stay human—or risk losing himself, and Grace, forever.",

    //         rating: 3.86,
    //         name: "Girl with a Pearl Earring",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,Historical,Classics,Art",
    //         image: "https://images.gr-assets.com/books/1327197580l/2865.jpg",
    //       },
    //       {
    //         author: "Maggie Stiefvater",
    //         description:
    //           "Last night while I lay thinking here Some Whatifs crawled inside my ear And pranced and partied all night long And sang their same old Whatif song: Whatif I flunk that test?Whatif green hair grows on my chest?Whatif nobody likes me?Whatif a bolt of lightning strikes me?...This 20th anniversary of Shel Silverstein's A Light in the Attic includes a CD of highlights from his Grammy Award-winning album.Here in the attic of Shel Silverstein you will find Backward Bill, Sour Face Ann, the Meehoo with an Exactlywatt, and the Polar Bear in the Frigidaire. You will talk with Broiled Face, and find out what happens when Somebody steals your knees, you get caught by the Quick-Digesting Gink, a Mountain snores, and They Put a Brassiere on the Camel.From the creator of the beloved poetry collections Where the Sidewalk Ends and Falling Up, here is another wondrous book of poems and drawings.",

    //         rating: 3.77,
    //         name: "Shiver",
    //         genre:
    //           "Young Adult,Fantasy,Romance,Fantasy,Paranormal,Shapeshifters,Werewolves",
    //         image: "https://images.gr-assets.com/books/1409283154l/6068551.jpg",
    //       },
    //       {
    //         author: "Shel Silverstein",
    //         description:
    //           "At one time Corrie ten Boom would have laughed at the idea that there would ever be a story to tell. For the first fifty years of her life nothing at all out of the ordinary had ever happened to her. She was an old-maid watchmaker living contentedly with her spinster sister and their elderly father in the tiny Dutch house over their shop. Their uneventful days, as regulated as their own watches, revolved around their abiding love for one another. However, with the Nazi invasion and occupation of Holland, a story did ensue. Corrie ten Boom and her family became leaders in the Dutch Underground, hiding Jewish people in their home in a specially built room and aiding their escape from the Nazis. For their help, all but Corrie found death in a concentration camp. The Hiding Place is their story.",

    //         rating: 4.34,
    //         name: "A Light in the Attic",
    //         genre: "Poetry,Childrens,Classics",
    //         image: "https://images.gr-assets.com/books/1427169918l/30118.jpg",
    //       },
    //       {
    //         author: "Wally Lamb",
    //         description:
    //           "Gripping listeners and readers for more than 2,700 years, 'The Iliad' is the story of the Trojan War and the rage of Achilles. Combining the skills of a poet and scholar, Robert Fagles brings the energy of contemporary language to this enduring heroic epic. If 'The Iliad' is the world's greatest war story, then 'The Odyssey' is literature's greatest evocation of every man's journey through life. Here again, Fagles has performed the translator's task magnificently, giving us an Odyssey to read aloud, to savor, and to treasure for its sheer lyrical mastery. Each volume contains a superb introduction with textual and critical commentary by renowned classicist Bernard Knox.",

    //         rating: 3.86,
    //         name: "She's Come Undone",
    //         genre: "Fiction,Contemporary,Womens Fiction,Chick Lit",
    //         image: "https://images.gr-assets.com/books/1408113538l/5203.jpg",
    //       },
    //       {
    //         author: "Rick Riordan",
    //         description:
    //           "One of the most celebrated works of classic literature for childrenMeet little Mole, willful Ratty, Badger the perennial bachelor, and petulant Toad. Over one hundred years since their first appearance in 1908, they've become emblematic archetypes of eccentricity, folly, and friendship. And their misadventures-in gypsy caravans, stolen sports cars, and their Wild Wood-continue to capture readers' imaginations and warm their hearts long after they grow up. Begun as a series of letters from Kenneth Grahame to his son, The Wind in the Willows is a timeless tale of animal cunning and human camaraderie. This Penguin Classics edition features an appendix of the letters in which Grahame first related the exploits of Toad.",

    //         rating: 4.35,
    //         name: "The Lost Hero",
    //         genre: "Fantasy,Young Adult,Fantasy,Mythology",
    //         image: "https://images.gr-assets.com/books/1464201003l/7736182.jpg",
    //       },
    //       {
    //         author: "Bill Watterson",
    //         description:
    //           "NAME: Valentine Michael SmithANCESTRY: HumanORIGIN: MarsValentine Michael Smith is a human being raised on Mars, newly returned to Earth. Among his people for the first time, he struggles to understand the social mores and prejudices of human nature that are so alien to him, while teaching them his own fundamental beliefs in grokking, watersharing, and love.",

    //         rating: 4.82,
    //         name: "The Complete Calvin and Hobbes",
    //         genre:
    //           "Sequential Art,Comics,Humor,Sequential Art,Graphic Novels,Fiction",
    //         image: "https://images.gr-assets.com/books/1473064526l/24812.jpg",
    //       },
    //       {
    //         author: "Robert A. Heinlein",
    //         description:
    //           "An alternate cover edition can be found hereIn the Pacific there is an island that looks like a big fish sunning itself in the sea. Around it, blue dolphins swim, otters play, and sea elephants and sea birds abound. Once, Indians also lived on the island. And when they left and sailed to the east, one young girl was left behind.This is the story of Karana, the Indian girl who lived alone for years on the Island of the Blue Dolphins. Year after year, she watched one season pass into another and waited for a ship to take her away. But while she waited, she kept herself alive by building shelter, making weapons, finding food, and fighting her enemies, the wild dogs. It is not only an unusual adventure of survival, but also a tale of natural beauty and personal discovery.",

    //         rating: 3.91,
    //         name: "Stranger in a Strange Land",
    //         genre: "Science Fiction,Fiction,Classics,Science Fiction Fantasy",
    //         image: "https://images.gr-assets.com/books/1156897088l/350.jpg",
    //       },
    //       {
    //         author: "Scott O'Dell",
    //         description:
    //           "This is a previously published edition of  ISBN13: 9781599906959.After serving out a year of hard labor in the salt mines of Endovier for her crimes, 18-year-old assassin Celaena Sardothien is dragged before the Crown Prince. Prince Dorian offers her her freedom on one condition: she must act as his champion in a competition to find a new royal assassin.Her opponents are men-thieves and assassins and warriors from across the empire, each sponsored by a member of the king's council. If she beats her opponents in a series of eliminations, she'll serve the kingdom for four years and then be granted her freedom. Celaena finds her training sessions with the captain of the guard, Westfall, challenging and exhilarating. But she's bored stiff by court life. Things get a little more interesting when the prince starts to show interest in her ... but it's the gruff Captain Westfall who seems to understand her best.Then one of the other contestants turns up dead ... quickly followed by another. Can Celaena figure out who the killer is before she becomes a victim? As the young assassin investigates, her search leads her to discover a greater destiny than she could possibly have imagined.",

    //         rating: 3.81,
    //         name: "Island of the Blue Dolphins",
    //         genre:
    //           "Young Adult,Fiction,Historical,Historical Fiction,Classics,Childrens",
    //         image: "https://images.gr-assets.com/books/1475166260l/233818.jpg",
    //       },
    //       {
    //         author: "Sarah J. Maas",
    //         description:
    //           "Librarian's note: An alternate cover edition can be found hereIn 1937 Ernest Hemingway traveled to Spain to cover the civil war there for the North American Newspaper Alliance. Three years later he completed the greatest novel to emerge from the good fight, For Whom the Bell Tolls. The story of Robert Jordan, a young American in the International Brigades attached to an antifascist guerilla unit in the mountains of Spain, it tells of loyalty and courage, love and defeat, and the tragic death of an ideal. In his portrayal of Jordan's love for the beautiful Maria and his superb account of El Sordo's last stand, in his brilliant travesty of La Pasionaria and his unwillingness to believe in blind faith, Hemingway surpasses his achievement in The Sun Also Rises and A Farewell to Arms to create a work at once rare and beautiful, strong and brutal, compassionate, moving and wise. If the function of a writer is to reveal reality, Maxwell Perkins wrote to Hemingway after reading the manuscript, no one ever so completely performed it. Greater in power, broader in scope, and more intensely emotional than any of the author's previous works, it stands as one of the best war novels of all time.",

    //         rating: 4.22,
    //         name: "Throne of Glass",
    //         genre: "Fantasy,Young Adult,Romance",
    //         image: "https://images.gr-assets.com/books/1495278054l/7896527.jpg",
    //       },
    //       {
    //         author: "Suzanne Collins",
    //         description:
    //           "When it first appeared, one volume per month, Stephen King's THE GREEN MILE was an unprecedented publishing triumph: all six volumes ended up on the New York Times bestseller lists—simultaneously—and delighted millions of fans the world over.Welcome to Cold Mountain Penitentiary, home to the Depression-worn men of E Block. Convicted killers all, each awaits his turn to walk the Green Mile, keeping a date with Old Sparky, Cold Mountain's electric chair. Prison guard Paul Edgecombe has seen his share of oddities in his years working the Mile. But he's never seen anyone like John Coffey, a man with the body of a giant and the mind of a child, condemned for a crime terrifying in its violence and shocking in its depravity. In this place of ultimate retribution, Edgecombe is about to discover the terrible, wondrous truth about Coffey, a truth that will challenge his most cherished beliefes... and yours.",

    //         rating: 4.29,
    //         name: "Catching Fire",
    //         genre:
    //           "Young Adult,Science Fiction,Dystopia,Fiction,Fantasy,Science Fiction",
    //         image: "https://images.gr-assets.com/books/1358273780l/6148028.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "In one of the most important and beloved Latin American works of the twentieth century, Isabel Allende weaves a luminous tapestry of three generations of the Trueba family, revealing both triumphs and tragedies. Here is patriarch Esteban, whose wild desires and political machinations are tempered only by his love for his ethereal wife, Clara, a woman touched by an otherworldly hand. Their daughter, Blanca, whose forbidden love for a man Esteban has deemed unworthy infuriates her father, yet will produce his greatest joy: his granddaughter Alba, a beautiful, ambitious girl who will lead the family and their country into a revolutionary future.The House of the Spirits is an enthralling saga that spans decades and lives, twining the personal and the political into an epic novel of love, magic, and fate.",

    //         rating: 4.43,
    //         name: "The Green Mile",
    //         genre: "Horror,Fiction,Fantasy,Thriller",
    //         image: "https://images.gr-assets.com/books/1373903563l/11566.jpg",
    //       },
    //       {
    //         author: "Lauren Oliver",
    //         description:
    //           "The stunning third and final novel in Stieg Larsson's internationally best-selling trilogy.Lisbeth Salander - the heart of Larsson's two previous novels - lies in critical condition, a bullet wound to her head, in the intensive care unit of a Swedish city hospital. She's fighting for her life in more ways than one: if and when she recovers, she'll be taken back to Stockholm to stand trial for three murders. With the help of her friend, journalist Mikael Blomkvist, she will not only have to prove her innocence, but also identify and denounce those in authority who have allowed the vulnerable, like herself, to suffer abuse and violence. And, on her own, she will plot revenge - against the man who tried to kill her, and the corrupt government institutions that very nearly destroyed her life.Once upon a time, she was a victim. Now Salander is fighting back.~from the jacket",

    //         rating: 3.99,
    //         name: "Delirium",
    //         genre: "Young Adult,Science Fiction,Dystopia,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1327890411l/11614718.jpg",
    //       },
    //       {
    //         author: "Wally Lamb",
    //         description:
    //           "Everywhere hailed as a novel of rare beauty and power, White Oleander tells the unforgettable story of Ingrid, a brilliant poet imprisoned for murder, and her daughter, Astrid, whose odyssey through a series of Los Angeles foster homes--each its own universe, with its own laws, its own dangers, its own hard lessons to be learned--becomes a redeeming and surprising journey of self-discovery.",

    //         rating: 4.18,
    //         name: "I Know This Much Is True",
    //         genre:
    //           "Fiction,Contemporary,Literary Fiction,Literature,Mental Health,Mental Illness,Novels,Family,Adult Fiction,Adult,Health,Mental Health",
    //         image: "https://images.gr-assets.com/books/1373532198l/227711.jpg",
    //       },
    //       {
    //         author: "Janet Fitch",
    //         description:
    //           "Once an aristocrat in the heady days of pre-revolutionary France, now Lestat is a rockstar in the demonic, shimmering 1980s. He rushes through the centuries in search of others like him, seeking answers to the mystery of his terrifying exsitence. His story, the second volume in Anne Rice's best-selling Vampire Chronicles, is mesmerizing, passionate, and thrilling.",

    //         rating: 3.95,
    //         name: "White Oleander",
    //         genre: "Fiction,Contemporary,Womens Fiction,Chick Lit",
    //         image: "https://images.gr-assets.com/books/1501159524l/32234.jpg",
    //       },
    //       {
    //         author: "Jamie McGuire",
    //         description:
    //           "Who is the real Margo?Quentin Jacobsen has spent a lifetime loving the magnificently adventurous Margo Roth Spiegelman from afar. So when she cracks open a window and climbs into his life—dressed like a ninja and summoning him for an ingenious campaign of revenge—he follows. After their all-nighter ends, and a new day breaks, Q arrives at school to discover that Margo, always an enigma, has now become a mystery. But Q soon learns that there are clues—and they're for him. Urged down a disconnected path, the closer he gets, the less Q sees the girl he thought he knew...",

    //         rating: 4.13,
    //         name: "Beautiful Disaster",
    //         genre:
    //           "Romance,New Adult,Contemporary,Young Adult,Romance,Contemporary Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1358259032l/11505797.jpg",
    //       },
    //       {
    //         author: "William Shakespeare",
    //         description:
    //           "The birth of Jesus has been well chronicled, as have his glorious teachings, acts, and divine sacrifice after his thirtieth birthday. But no one knows about the early life of the Son of God, the missing years—except Biff, the Messiah's best bud, who has been resurrected to tell the story in the divinely hilarious yet heartfelt work reminiscent of Vonnegut and Douglas Adams (Philadelphia Inquirer).Verily, the story Biff has to tell is a miraculous one, filled with remarkable journeys, magic, healings, kung fu, corpse reanimations, demons, and hot babes. Even the considerable wiles and devotion of the Savior's pal may not be enough to divert Joshua from his tragic destiny. But there's no one who loves Josh more—except maybe Maggie, Mary of Magdala—and Biff isn't about to let his extraordinary pal suffer and ascend without a fight.",

    //         rating: 3.88,
    //         name: "Othello",
    //         genre: "Classics,Plays,Drama,Fiction,Academic,School",
    //         image: "https://images.gr-assets.com/books/1459795105l/12996.jpg",
    //       },
    //       {
    //         author: "Christopher Moore",
    //         description:
    //           "Once upon a time, a young boy called “Wart” was tutored by a magician named Merlyn in preparation for a future he couldn’t possibly imagine. A future in which he would ally himself with the greatest knights, love a legendary queen and unite a country dedicated to chivalrous values. A future that would see him crowned and known for all time as Arthur, King of the Britons.During Arthur’s reign, the kingdom of Camelot was founded to cast enlightenment on the Dark Ages, while the knights of the Round Table embarked on many a noble quest. But Merlyn foresaw the treachery that awaited his liege: the forbidden love between Queen Guinevere and Lancelot, the wicked plots of Arthur’s half-sister Morgause, and the hatred she fostered in Mordred that would bring an end to the king’s dreams for Britain--and to the king himself.",

    //         rating: 4.26,
    //         name: "Lamb: The Gospel According to Biff, Christ's Childhood Pal",
    //         genre:
    //           "Humor,Fiction,Historical,Historical Fiction,Fantasy,Religion,Humor,Comedy",
    //         image: "https://images.gr-assets.com/books/1331419009l/28881.jpg",
    //       },
    //       {
    //         author: "T.H. White",
    //         description:
    //           "Ki Longfellow, author of the acclaimed The Secret Magdalene, has now written the astonishing life of Hypatia, famed throughout the Mediterranean world, a beauty and a genius, yet for 17 centuries ignored by history. As the Roman Empire fights for its life and emerging Christianity fights for our souls, Hypatia is the last great voice of reason. A woman of sublime intelligence, Hypatia ranks above not only all women, but all men. Hypatia dazzled the world with her brilliance, was courted by men of every persuasion and was considered the leading philosopher and mathematician of her age...yet her mathematics, her inventions, the very story of her life in all its epic and dramatic intensity, has gone untold. A heart-breaking love story, an heroic struggle against intolerance, a tragedy and a triumph, Hypatia walks through these pages fully realized while all around her Egypt's Alexandria, the New York City of its day, strives to remain a beacon of light in a darkening world.",

    //         rating: 4.08,
    //         name: "The Once and Future King",
    //         genre:
    //           "Fantasy,Classics,Fiction,Historical,Historical Fiction,Mythology,Arthurian",
    //         image: "https://images.gr-assets.com/books/1338741283l/43545.jpg",
    //       },
    //       {
    //         author: "Ki Longfellow",
    //         description:
    //           "Novelist Paul Sheldon has plans to make the difficult transition from writing historical romances featuring heroine Misery Chastain to publishing literary fiction. Annie Wilkes, Sheldon's number one fan, rescues the author from the scene of a car accident. The former nurse takes care of him in her remote house, but becomes irate when she discovers that the author has killed Misery off in his latest book. Annie keeps Sheldon prisoner while forcing him to write a book that brings Misery back to life.Source: stephenking.com",

    //         rating: 4.44,
    //         name: "Flow Down Like Silver: Hypatia of Alexandria",
    //         genre:
    //           "Historical,Historical Fiction,Northern Africa,Egypt,Fiction,Historical",
    //         image: "https://images.gr-assets.com/books/1348371147l/6801755.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "Librarian's Note: An alternate cover edition can be found hereIn April 1992 a young man from a well-to-do family hitchhiked to Alaska and walked alone into the wilderness north of Mt. McKinley. His name was Christopher Johnson McCandless. He had given $25,000 in savings to charity, abandoned his car and most of his possessions, burned all the cash in his wallet, and invented a new life for himself. Four months later, a party of moose hunters found his decomposed body. How McCandless came to die is the unforgettable story of Into the Wild.Immediately after graduating from college in 1991, McCandless had roamed through the West and Southwest on a vision quest like those made by his heroes Jack London and John Muir. In the Mojave Desert he abandoned his car, stripped it of its license plates, and burned all of his cash. He would give himself a new name, Alexander Supertramp, and, unencumbered by money and belongings, he would be free to wallow in the raw, unfiltered experiences that nature presented. Craving a blank spot on the map, McCandless simply threw away the maps. Leaving behind his desperate parents and sister, he vanished into the wild.",

    //         rating: 4.13,
    //         name: "Misery",
    //         genre: "Horror,Fiction,Thriller",
    //         image: "https://images.gr-assets.com/books/1270545451l/10614.jpg",
    //       },
    //       {
    //         author: "Jon Krakauer",
    //         description:
    //           "King Lear, growing old and too tired to reign, decides to divide his realm amongst his three daughters, leaving the largest share to the one who loves him the most. His two eldest daughters, Goneril and Regan, foolish and deceitful children, are rewarded for their insincere flattery. His youngest daughter, Cordelia, however, speaks honestly and truthfully, which enrages the old king. He disinherits Cordelia, and then drives himself to madness, left to wander the heath with only his Fool, his servant Caius, and the madman Tom O’Bedlam for company. Once reunited with Cordelia, Lear is too late repents his rashness, and must face the tragic consequences of his choices.",

    //         rating: 3.96,
    //         name: "Into the Wild",
    //         genre: "Nonfiction,Biography,Adventure,Travel",
    //         image: "https://images.gr-assets.com/books/1403173986l/1845.jpg",
    //       },
    //       {
    //         author: "William Shakespeare",
    //         description:
    //           "Returning to Russia from a sanitarium in Switzerland, the Christ-like epileptic Prince Myshkin finds himself enmeshed in a tangle of love, torn between two women—the notorious kept woman Nastasya and the pure Aglaia—both involved, in turn, with the corrupt, money-hungry Ganya. In the end, Myshkin’s honesty, goodness, and integrity are shown to be unequal to the moral emptiness of those around him. In her revision of the Garnett translation, Anna Brailovsky has corrected inaccuracies wrought by Garnett’s drastic anglicization of the novel, restoring as much as possible the syntactical structure of the original story.",

    //         rating: 3.9,
    //         name: "King Lear",
    //         genre: "Classics,Plays,Drama,Fiction",
    //         image: "https://images.gr-assets.com/books/1331563731l/12938.jpg",
    //       },
    //       {
    //         author: "Tim O'Brien",
    //         description:
    //           "A hypnotic (The New York Times Book Review) collection of four novellas from Stephen King bound together by the changing of seasons, each taking on the theme of a journey with strikingly different tones and characters.The wondrous readability of his work, as well as the instant sense of communication with his characters, are what make Stephen King the consummate storyteller that he is, hailed the Houston Chronicle about Different Seasons.This gripping collection begins with Rita Hayworth and the Shawshank Redemption, in which an unjustly imprisoned convict seeks a strange and startling revenge—the basis for the Best Picture Academy Award-nominee The Shawshank Redemption. Next is Apt Pupil, the inspiration for the film of the same name about top high school student Todd Bowden and his obsession with the dark and deadly past of an older man in town. In The Body, four rambunctious young boys plunge through the fa�ade of a small town and come face-to-face with life, death, and intimations of their own mortality. This novella became the movie Stand By Me. Finally, a disgraced woman is determined to triumph over death in The Breathing Method.",

    //         rating: 4.12,
    //         name: "The Things They Carried",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,War,Classics,Short Stories",
    //         image: "https://images.gr-assets.com/books/1424663847l/133518.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "A loving threesome, they ranged the dark hills and river bottoms of Cherokee country. Old Dan had the brawn. Little Ann had the brains, and Billy had the will to make them into the finest hunting team in the valley. Glory and victory were coming to them, but sadness waited too. Where the Red Fern Grows is an exciting tale of love and adventure you'll never forget.",

    //         rating: 4.35,
    //         name: "Different Seasons",
    //         genre: "Horror,Fiction,Short Stories,Thriller",
    //         image: "https://images.gr-assets.com/books/1329662611l/39662.jpg",
    //       },
    //       {
    //         author: "William Shakespeare",
    //         description:
    //           "Ever since he made his first appearance in A Study In Scarlet, Sherlock Holmes has enthralled and delighted millions of fans throughout the world.",

    //         rating: 4.49,
    //         name: "The Complete Works",
    //         genre: "Classics,Poetry,Plays,Fiction",
    //         image: "https://images.gr-assets.com/books/1327884293l/569564.jpg",
    //       },
    //       {
    //         author: "Arthur Conan Doyle",
    //         description:
    //           "Little orphan Heidi goes to live high in the Alps with her gruff grandfather and brings happiness to all who know her on the mountain. When Heidi goes to Frankfurt to work in a wealthy household, she dreams of returning to the mountains and meadows, her friend Peter, and her beloved grandfather.",

    //         rating: 4.5,
    //         name: "The Complete Sherlock Holmes, Vol 1",
    //         genre: "Classics,Mystery,Fiction,Mystery,Crime",
    //         image: "https://images.gr-assets.com/books/1512062096l/188572.jpg",
    //       },
    //       {
    //         author: "Isaac Asimov",
    //         description:
    //           "Margaret Simon, almost twelve, likes long hair, tuna fish, the smell of rain, and things that are pink. She’s just moved from New York City to Farbook, New Jersey, and is anxious to fit in with her new friends—Nancy, Gretchen, and Janie. When they form a secret club to talk about private subjects like boys, bras, and getting their first periods, Margaret is happy to belong.But none of them can believe Margaret doesn’t have religion, and that she isn’t going to the Y or the Jewish Community Center. What they don’t know is Margaret has her own very special relationship with God. She can talk to God about everything—family, friends, even Moose Freed, her secret crush.Margaret is funny and real, and her thoughts and feelings are oh-so-relatable—you’ll feel like she’s talking right to you, sharing her secrets with a friend.",

    //         rating: 4.15,
    //         name: "Foundation",
    //         genre: "Science Fiction,Fiction,Classics",
    //         image: "https://images.gr-assets.com/books/1417900846l/29579.jpg",
    //       },
    //       {
    //         author: "Judy Blume",
    //         description:
    //           "Originally published in 1854, Walden; or, Life in the Woods, is a vivid account of the time that Henry D. Thoreau lived alone in a secluded cabin at Walden Pond. It is one of the most influential and compelling books in American literature. This new paperback edition-introduced by noted American writer John Updike-celebrates the 150th anniversary of this classic work. Much of Walden's material is derived from Thoreau's journals and contains such engaging pieces as Reading and The Pond in the Winter Other famous sections involve Thoreau's visits with a Canadian woodcutter and with an Irish family, a trip to Concord, and a description of his bean field. This is the complete and authoritative text of Walden-as close to Thoreau's original intention as all available evidence allows. For the student and for the general reader, this is the ideal presentation of Thoreau's great document of social criticism and dissent.",

    //         rating: 3.89,
    //         name: "Are You There God? It's Me, Margaret",
    //         genre: "Young Adult,Fiction,Childrens,Classics",
    //         image: "https://images.gr-assets.com/books/1388356524l/37732.jpg",
    //       },
    //       {
    //         author: "Henry David Thoreau",
    //         description:
    //           "When first published in 1899, The Awakening shocked readers with its honest treatment of female marital infidelity. Audiences accustomed to the pieties of late Victorian romantic fiction were taken aback by Chopin's daring portrayal of a woman trapped in a stifling marriage, who seeks and finds passionate physical love outside the confines of her domestic situation.Aside from its unusually frank treatment of a then-controversial subject, the novel is widely admired today for its literary qualities. Edmund Wilson characterized it as a work quite uninhibited and beautifully written, which anticipates D. H. Lawrence in its treatment of infidelity. Although the theme of marital infidelity no longer shocks, few novels have plumbed the psychology of a woman involved in an illicit relationship with the perception, artistry, and honesty that Kate Chopin brought to The Awakening.",

    //         rating: 3.8,
    //         name: "Walden",
    //         genre: "Classics,Nonfiction,Philosophy,Environment,Nature",
    //         image: "https://images.gr-assets.com/books/1465675526l/16902.jpg",
    //       },
    //       {
    //         author: "Kate Chopin",
    //         description:
    //           "“I’ve had a most amazing time....”So begins the Time Traveller’s astonishing firsthand account of his journey 800,000 years beyond his own era—and the story that launched H.G. Wells’s successful career and earned him his reputation as the father of science fiction. With a speculative leap that still fires the imagination, Wells sends his brave explorer to face a future burdened with our greatest hopes...and our darkest fears. A pull of the Time Machine’s lever propels him to the age of a slowly dying Earth.  There he discovers two bizarre races—the ethereal Eloi and the subterranean Morlocks—who not only symbolize the duality of human nature, but offer a terrifying portrait of the men of tomorrow as well.  Published in 1895, this masterpiece of invention captivated readers on the threshold of a new century. Thanks to Wells’s expert storytelling and provocative insight, The Time Machine will continue to enthrall readers for generations to come.",

    //         rating: 3.64,
    //         name: "The Awakening",
    //         genre: "Classics,Fiction,Feminism,Academic,School,Literature",
    //         image: "https://images.gr-assets.com/books/1170507247l/58345.jpg",
    //       },
    //       {
    //         author: "Donna Tartt",
    //         description:
    //           "Three stories are told: a young Southerner wants to become a writer; a turbulent love-hate affair between a brilliant Jew and a beautiful Polish woman; and of an awful wound in that woman's past--one that impels both Sophie and Nathan toward destruction.",

    //         rating: 4.09,
    //         name: "The Secret History",
    //         genre: "Fiction,Mystery,Contemporary",
    //         image: "https://images.gr-assets.com/books/1451554846l/29044.jpg",
    //       },
    //       {
    //         author: "Cassandra Clare",
    //         description:
    //           "One day fourteen-year-old Sophie Amundsen comes home from school to find in her mailbox two notes, with one question on each: Who are you? and Where does the world come from? From that irresistible beginning, Sophie becomes obsessed with questions that take her far beyond what she knows of her Norwegian village. Through those letters, she enrolls in a kind of correspondence course, covering Socrates to Sartre, with a mysterious philosopher, while receiving letters addressed to another girl. Who is Hilde? And why does her mail keep turning up? To unravel this riddle, Sophie must use the philosophy she is learning—but the truth turns out to be far more complicated than she could have imagined.",

    //         rating: 4.29,
    //         name: "City of Lost Souls",
    //         genre: "Fantasy,Young Adult,Fantasy,Paranormal,Romance",
    //         image: "https://images.gr-assets.com/books/1460477703l/8755776.jpg",
    //       },
    //       {
    //         author: "Pat Conroy",
    //         description:
    //           "Many adults name this book as their favorite Little Golden Book. Generations of kids have interacted with lovable, furry old Grover as he begs the reader not to turn the page—for fear of a monster at the end of the book. “Oh, I am so embarrassed,” he says on the last page . . . for, of course, the monster is Grover himself! This all-time favorite is now available as a Big Little Golden Book—perfect for lap-time reading.",

    //         rating: 4.23,
    //         name: "The Prince of Tides",
    //         genre: "Fiction,American,Southern,Classics,Contemporary,Romance",
    //         image: "https://images.gr-assets.com/books/1512744907l/16735.jpg",
    //       },
    //       {
    //         author: "Fannie Flagg",
    //         description:
    //           "Daunted by the singular sexual tastes and dark secrets of the beautiful, tormented young entrepreneur Christian Grey, Anastasia Steele has broken off their relationship to start a new career with a Seattle publishing house. But desire for Christian still dominates her every waking thought, and when he proposes a new arrangement, Anastasia cannot resist. They rekindle their searing sensual affair, and Anastasia learns more about the harrowing past of her damaged, driven, and demanding Fifty Shades. While Christian wrestles with his inner demons, Anastasia must confront her anger and envy of the women who came before her and make the most important decision of her life. Erotic, sparkling and suspenseful, Fifty Shades Darker is the irresistibly addictive second part of the Fifty Shades trilogy.",

    //         rating: 4.27,
    //         name: "Fried Green Tomatoes at the Whistle Stop Cafe",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Lgbt,Classics,Womens Fiction,Chick Lit,American,Southern",
    //         image: "https://images.gr-assets.com/books/1165961740l/9375.jpg",
    //       },
    //       {
    //         author: "E.L. James",
    //         description:
    //           "Kafka on the Shore is powered by two remarkable characters: a teenage boy, Kafka Tamura, who runs away from home either to escape a gruesome oedipal prophecy or to search for his long-missing mother and sister; and an aging simpleton called Nakata, who never recovered from a wartime affliction and now is drawn toward Kafka for reasons that, like the most basic activities of daily life, he cannot fathom.As their paths converge, and the reasons for that convergence become clear, Haruki Murakami enfolds readers in a world where cats talk, fish fall from the sky, and spirits slip out of their bodies to make love or commit murder. Kafka on the Shore displays one of the world’s great storytellers at the peak of his powers.",

    //         rating: 3.86,
    //         name: "Fifty Shades Darker",
    //         genre: "Romance,Adult Fiction,Erotica,Fiction,Erotica,Bdsm,Adult",
    //         image:
    //           "https://images.gr-assets.com/books/1358266080l/11857408.jpg",
    //       },
    //       {
    //         author: "Patrick Rothfuss",
    //         description:
    //           "The short story, Franny, takes place in an unnamed college town and tells the tale of an undergraduate who is becoming disenchanted with the selfishness and inauthenticity she perceives all around her.The novella, Zooey, is named for Zooey Glass, the second-youngest member of the Glass family. As his younger sister, Franny, suffers a spiritual and existential breakdown in her parents' Manhattan living room -- leaving Bessie, her mother, deeply concerned -- Zooey comes to her aid, offering what he thinks is brotherly love, understanding, and words of sage advice.Salinger writes of these works: FRANNY came out in The New Yorker in 1955, and was swiftly followed, in 1957 by ZOOEY. Both stories are early, critical entries in a narrative series I'm doing about a family of settlers in twentieth-century New York, the Glasses. It is a long-term project, patently an ambiguous one, and there is a real-enough danger, I suppose that sooner or later I'll bog down, perhaps disappear entirely, in my own methods, locutions, and mannerisms. On the whole, though, I'm very hopeful. I love working on these Glass stories, I've been waiting for them most of my life, and I think I have fairly decent, monomaniacal plans to finish them with due care and all-available skill.",

    //         rating: 4.58,
    //         name: "The Wise Man's Fear",
    //         genre: "Fantasy,Fiction,Fantasy,Epic Fantasy",
    //         image: "https://images.gr-assets.com/books/1452624392l/1215032.jpg",
    //       },
    //       {
    //         author: "J.D. Salinger",
    //         description:
    //           "In 1939, as Hitler casts his enormous, cruel shadow across the world, the seeds of apartheid take root in South Africa. There, a boy called Peekay is born. His childhood is marked by humiliation and abandonment, yet he vows to survive and conceives heroic dreams, which are nothing compared to what life actually has in store for him. He embarks on an epic journey through a land of tribal superstition and modern prejudice where he will learn the power of words, the power to transform lives and the power of one.",

    //         rating: 3.98,
    //         name: "Franny and Zooey",
    //         genre: "Fiction,Classics,Short Stories,Literature",
    //         image: "https://images.gr-assets.com/books/1355037988l/5113.jpg",
    //       },
    //       {
    //         author: "Rainbow Rowell",
    //         description:
    //           "THINGS FALL APART tells two overlapping, intertwining stories, both of which center around Okonkwo, a “strong man” of an Ibo village in Nigeria. The first of these stories traces Okonkwo's fall from grace with the tribal world in which he lives, and in its classical purity of line and economical beauty it provides us with a powerful fable about the immemorial conflict between the individual and society. The second story, which is as modern as the first is ancient, and which elevates the book to a tragic plane, concerns the clash of cultures and the destruction of Okonkwo's world through the arrival of aggressive, proselytizing European missionaries. These twin dramas are perfectly harmonized, and they are modulated by an awareness capable of encompassing at once the life of nature, human history, and the mysterious compulsions of the soul. THINGS FALL APART is the most illuminating and permanent monument we have to the modern African experience as seen from within.",

    //         rating: 4.1,
    //         name: "Fangirl",
    //         genre: "Young Adult,Contemporary,Romance,Fiction",
    //         image:
    //           "https://images.gr-assets.com/books/1355886270l/16068905.jpg",
    //       },
    //       {
    //         author: "Chinua Achebe",
    //         description:
    //           "Percy is confused. When he awoke from his long sleep, he didn't know much more than his name. His brain fuzz is lingering, even after the wolf Lupa told him he is a demigod and trained him to fight with the pen/sword in his pocket. Somehow Percy manages to make it to a camp for half-bloods, despite the fact that he has to keep killing monsters along the way. But the camp doesn't ring any bells with him. The only thing he can recall from his past is another name: Annabeth. Hazel is supposed to be dead. When she lived before, she didn't do a very good job of it. Sure, she was an obedient daughter, even when her mother was possessed by greed. But that was the problem—when the Voice took over her mother and commanded Hazel to use her gift for an evil purpose, Hazel couldn't say no. Now because of her mistake, the future of the world is at risk. Hazel wishes she could ride away from it all on the stallion that appears in her dreams. Frank is a klutz. His grandmother says he is descended from heroes and can be anything he wants to be, but he doesn't see it. He doesn't even know who his father is. He keeps hoping Apollo will claim him, because the only thing he is good at is archery—although not good enough to win camp war games. His bulky physique makes him feel like an ox, especially in front of Hazel, his closest friend at camp. He trusts her completely—enough to share the secret he holds close to his heart. Beginning at the other camp for half-bloods and extending as far as the land beyond the gods, this breathtaking second installment of the Heroes of Olympus series introduces new demigods, revives fearsome monsters, and features other remarkable creatures, all destined to play a part in the Prophesy of Seven.",

    //         rating: 3.63,
    //         name: "Things Fall Apart",
    //         genre:
    //           "Fiction,Classics,Cultural,Africa,Historical,Historical Fiction,Academic,School,Literature",
    //         image: "https://images.gr-assets.com/books/1352082529l/37781.jpg",
    //       },
    //       {
    //         author: "Rick Riordan",
    //         description:
    //           "Taking place in the years leading up to the First Reform Bill of 1832, Middlemarch explores nearly every subject of concern to modern life: art, religion, science, politics, self, society, human relationships. Among her characters are some of the most remarkable portraits in English literature: Dorothea Brooke, the heroine, idealistic but naive; Rosamond Vincy, beautiful and egoistic: Edward Casaubon, the dry-as-dust scholar: Tertius Lydgate, the brilliant but morally-flawed physician: the passionate artist Will Ladislaw: and Fred Vincey and Mary Garth, childhood sweethearts whose charming courtship is one of the many humorous elements in the novel's rich comic vein.",

    //         rating: 4.44,
    //         name: "The Son of Neptune",
    //         genre: "Fantasy,Young Adult,Fantasy,Mythology",
    //         image: "https://images.gr-assets.com/books/1464201114l/9520360.jpg",
    //       },
    //       {
    //         author: "C.S. Lewis",
    //         description:
    //           "On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne’s fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick’s clever and beautiful wife disappears. Husband-of-the-Year Nick isn’t doing himself any favors with cringe-worthy daydreams about the slope and shape of his wife’s head, but passages from Amy's diary reveal the alpha-girl perfectionist could have put anyone dangerously on edge. Under mounting pressure from the police and the media—as well as Amy’s fiercely doting parents—the town golden boy parades an endless series of lies, deceits, and inappropriate behavior. Nick is oddly evasive, and he’s definitely bitter—but is he really a killer?",

    //         rating: 4.02,
    //         name: "The Magician's Nephew",
    //         genre: "Fantasy,Classics,Fiction,Young Adult,Childrens",
    //         image: "https://images.gr-assets.com/books/1308814770l/65605.jpg",
    //       },
    //       {
    //         author: "Gillian Flynn",
    //         description:
    //           "Life moves at a leisurely pace in the tiny town of Wall—named after the imposing stone barrier which separates the town from a grassy meadow. Here, young Tristran Thorn has lost his heart to the beautiful Victoria Forester and for the coveted prize of her hand, Tristran vows to retrieve a fallen star and deliver it to his beloved. It is an oath that sends him over the ancient wall and into a world that is dangerous and strange beyond imagining...",

    //         rating: 4.05,
    //         name: "Gone Girl",
    //         genre: "Fiction,Mystery,Thriller,Mystery,Crime",
    //         image:
    //           "https://images.gr-assets.com/books/1397056917l/19288043.jpg",
    //       },
    //       {
    //         author: "Neil Gaiman",
    //         description:
    //           "In Bryson's biggest book, he confronts his greatest challenge: to understand—and, if possible, answer—the oldest, biggest questions we have posed about the universe and ourselves. Taking as territory everything from the Big Bang to the rise of civilization, Bryson seeks to understand how we got from there being nothing at all to there being us. To that end, he has attached himself to a host of the world’s most advanced (and often obsessed) archaeologists, anthropologists, and mathematicians, travelling to their offices, laboratories, and field camps. He has read (or tried to read) their books, pestered them with questions, apprenticed himself to their powerful minds. A Short History of Nearly Everything is the record of this quest, and it is a sometimes profound, sometimes funny, and always supremely clear and entertaining adventure in the realms of human knowledge, as only Bill Bryson can render it. Science has never been more involving or entertaining.",

    //         rating: 4.08,
    //         name: "Stardust",
    //         genre: "Fantasy",
    //         image: "https://images.gr-assets.com/books/1459127484l/16793.jpg",
    //       },
    //       {
    //         author: "Bill Bryson",
    //         description:
    //           "From the Booker Prize-winning author of The Remains of the Day and When We Were Orphans, comes an unforgettable edge-of-your-seat mystery that is at once heartbreakingly tender and morally courageous about what it means to be human.Hailsham seems like a pleasant English boarding school, far from the influences of the city. Its students are well tended and supported, trained in art and literature, and become just the sort of people the world wants them to be. But, curiously, they are taught nothing of the outside world and are allowed little contact with it.Within the grounds of Hailsham, Kathy grows from schoolgirl to young woman, but it’s only when she and her friends Ruth and Tommy leave the safe grounds of the school (as they always knew they would) that they realize the full truth of what Hailsham is.Never Let Me Go breaks through the boundaries of the literary novel. It is a gripping mystery, a beautiful love story, and also a scathing critique of human arrogance and a moral examination of how we treat the vulnerable and different in our society. In exploring the themes of memory and the impact of the past, Ishiguro takes on the idea of a possible future to create his most moving and powerful book to date.",

    //         rating: 4.2,
    //         name: "A Short History of Nearly Everything",
    //         genre: "Nonfiction,Science,History",
    //         image: "https://images.gr-assets.com/books/1433086293l/21.jpg",
    //       },
    //       {
    //         author: "William Faulkner",
    //         description:
    //           "'We have all been more or less to blame ... every one of us, excepting Fanny' Taken from the poverty of her parents' home, Fanny Price is brought up with her rich cousins at Mansfield Park, acutely aware of her humble rank and with only her cousin Edmund as an ally. When Fanny's uncle is absent in Antigua, Mary Crawford and her brother Henry arrive in the neighbourhood, bringing with them London glamour and a reckless taste for flirtation. As her female cousins vie for Henry's attention, and even Edmund falls for Mary's dazzling charms, only Fanny remains doubtful about the Crawfords' influence and finds herself more isolated than ever. A subtle examination of social position and moral integrity, Mansfield Park is one of Jane Austen's most profound works. This edition is based on the first edition of 1814. It includes a new chronology, additional suggestions for further reading and the original Penguin Classics introduction by Tony Tanner",

    //         rating: 3.72,
    //         name: "As I Lay Dying",
    //         genre: "Classics,Fiction,Literature,Novels",
    //         image: "https://images.gr-assets.com/books/1451810782l/77013.jpg",
    //       },
    //       {
    //         author: "Jane Austen",
    //         description:
    //           "Joe Kavalier, a young Jewish artist who has also been trained in the art of Houdini-esque escape, has just smuggled himself out of Nazi-invaded Prague and landed in New York City. His Brooklyn cousin Sammy Clay is looking for a partner to create heroes, stories, and art for the latest novelty to hit America - the comic book. Drawing on their own fears and dreams, Kavalier and Clay create the Escapist, the Monitor, and Luna Moth, inspired by the beautiful Rosa Saks, who will become linked by powerful ties to both men. With exhilarating style and grace, Michael Chabon tells an unforgettable story about American romance and possibility.",

    //         rating: 3.85,
    //         name: "Mansfield Park",
    //         genre: "Classics,Fiction,Romance",
    //         image: "https://images.gr-assets.com/books/1397063295l/45032.jpg",
    //       },
    //       {
    //         author: "Michael Chabon",
    //         description:
    //           "An angry rebel, John dropped out of school and enlisted in the Army, not knowing what else to do with his life--until he meets the girl of his dreams, Savannah. Their mutual attraction quickly grows into the kind of love that leaves Savannah waiting for John to finish his tour of duty, and John wanting to settle down with the woman who has captured his heart. But 9/11 changes everything. John feels it is his duty to re-enlist. And sadly, the long separation finds Savannah falling in love with someone else. Dear John, the letter read... and with those two words, a heart was broken and two lives were changed forever. Returning home, John must come to grips with the fact that Savannah, now married, is still his true love—and face the hardest decision of his life.",

    //         rating: 4.17,
    //         name: "The Amazing Adventures of Kavalier & Clay",
    //         genre: "Fiction,Historical,Historical Fiction,Literature",
    //         image: "https://images.gr-assets.com/books/1503806495l/3985.jpg",
    //       },
    //       {
    //         author: "Nicholas Sparks",
    //         description:
    //           "Doomed to - or blessed with - eternal life after drinking from a magic spring, the Tuck family wanders about trying to live as inconspicuously and comfortably as they can. When ten-year-old Winnie Foster stumbles on their secret, the Tucks take her home and explain why living forever at one age is less a blessing that it might seem. Complications arise when Winnie is followed by a stranger who wants to market the spring water for a fortune.",

    //         rating: 4.02,
    //         name: "Dear John",
    //         genre: "Romance,Fiction,Womens Fiction,Chick Lit,Contemporary",
    //         image: "https://images.gr-assets.com/books/1397749854l/5526.jpg",
    //       },
    //       {
    //         author: "Dave Pelzer",
    //         description:
    //           "Oaths sworn... loyalties tested... forces collide.It's been only months since Eragon first uttered brisingr, an ancient language term for fire. Since then, he's not only learned to create magic with words — he's been challenged to his very core. Following the colossal battle against the Empires warriors on the Burning Plains, Eragon and his dragon, Saphira, have narrowly escaped with their lives. Still, there is more adventure at hand for the Rider and his dragon, as Eragon finds himself bound by a tangle of promises he may not be able to keep.First is Eragon's oath to his cousin, Roran: to help rescue Roran's beloved from King Galbatorix's clutches. But Eragon owes his loyalty to others, too. The Varden are in desperate need of his talents and strength — as are the elves and dwarves. When unrest claims the rebels and danger strikes from every corner, Eragon must make choices — choices that will take him across the Empire and beyond, choices that may lead to unimagined sacrifice.Eragon is the greatest hope to rid the land of tyranny. Can this once simple farm boy unite the rebel forces and defeat the king?",

    //         rating: 4.09,
    //         name: "A Child Called It",
    //         genre: "Nonfiction,Autobiography,Memoir,Biography,Psychology",
    //         image: "https://images.gr-assets.com/books/1438400434l/60748.jpg",
    //       },
    //       {
    //         author: "Christopher Paolini",
    //         description:
    //           "Nora Grey's life is still far from perfect. Surviving an attempt on her life wasn't pleasant, but at least she got a guardian angel out of it. A mysterious, magnetic, gorgeous guardian angel. But despite his role in her life, Patch has been acting anything but angelic. He's more elusive than ever (if that's possible) and what's worse, he seems to be spending time with Nora's archenemy, Marcie Millar.Nora would have hardly noticed Scott Parnell, an old family friend who has moved back to town, if Patch hadn't been acting so distant. Even with Scott's totally infuriating attitude, Nora finds herself drawn to him - despite her lingering feelings that he is hiding something.If that weren't enough, Nora is haunted by images of her murdered father, and comes to question whether her Nephilim bloodline has anything to do with his death. Desperate to figure out what happened, she puts herself in increasingly dangerous situations to get the answer. But maybe some things are better left buried, because the truth could destroy everything - and everyone - she trusts.",

    //         rating: 4.04,
    //         name: "Brisingr",
    //         genre: "Fantasy,Young Adult,Fantasy,Dragons,Fiction",
    //         image: "https://images.gr-assets.com/books/1391443970l/2248573.jpg",
    //       },
    //       {
    //         author: "Becca Fitzpatrick",
    //         description:
    //           "Through Jim Burden's endearing, smitten voice, we revisit the remarkable vicissitudes of immigrant life in the Nebraska heartland, with all its insistent bonds. Guiding the way are some of literature's most beguiling characters: the Russian brothers plagued by memories of a fateful sleigh ride, Antonia's desperately homesick father and self-indulgent mother, and the coy Lena Lingard. Holding the pastoral society's heart, of course, is the bewitching, free-spirited Antonia.",

    //         rating: 4.06,
    //         name: "Crescendo",
    //         genre:
    //           "Young Adult,Fantasy,Paranormal,Angels,Fantasy,Paranormal,Romance,Romance,Paranormal Romance,Fantasy,Supernatural,Fiction,Fantasy,Urban Fantasy,Young Adult,Teen",
    //         image: "https://images.gr-assets.com/books/1362408146l/7791997.jpg",
    //       },
    //       {
    //         author: "Willa Cather",
    //         description:
    //           "My name is Katniss Everdeen.Why am I not dead?I should be dead.Katniss Everdeen, girl on fire, has survived, even though her home has been destroyed. Gale has escaped. Katniss's family is safe. Peeta has been captured by the Capitol. District 13 really does exist. There are rebels. There are new leaders. A revolution is unfolding.It is by design that Katniss was rescued from the arena in the cruel and haunting Quarter Quell, and it is by design that she has long been part of the revolution without knowing it. District 13 has come out of the shadows and is plotting to overthrow the Capitol. Everyone, it seems, has had a hand in the carefully laid plans--except Katniss.The success of the rebellion hinges on Katniss's willingness to be a pawn, to accept responsibility for countless lives, and to change the course of the future of Panem. To do this, she must put aside her feelings of anger and distrust. She must become the rebels' Mockingjay--no matter what the personal cost.",

    //         rating: 3.77,
    //         name: "My Ántonia",
    //         genre: "Classics,Fiction,Historical,Historical Fiction,Literature",
    //         image: "https://images.gr-assets.com/books/1389151307l/17150.jpg",
    //       },
    //       {
    //         author: "Truman Capote",
    //         description:
    //           "Louisa Clark is an ordinary young woman living an exceedingly ordinary life—steady boyfriend, close family—who has never been farther afield than their tiny village. She takes a badly needed job working for ex-Master of the Universe Will Traynor, who is wheelchair-bound after an accident. Will has always lived a huge life—big deals, extreme sports, worldwide travel—and now he’s pretty sure he cannot live the way he is. Will is acerbic, moody, bossy—but Lou refuses to treat him with kid gloves, and soon his happiness means more to her than she expected. When she learns that Will has shocking plans of his own, she sets out to show him that life is still worth living.A love story for this generation, Me Before You brings to life two people who couldn’t have less in common—a heartbreakingly romantic novel that asks, What do you do when making the person you love happy also means breaking your own heart?",

    //         rating: 3.89,
    //         name: "Breakfast at Tiffany's",
    //         genre: "Classics,Fiction,Short Stories",
    //         image: "https://images.gr-assets.com/books/1477015353l/251688.jpg",
    //       },
    //       {
    //         author: "Jojo Moyes",
    //         description:
    //           "Will is the bearer of the knife. Now, accompanied by angels, his task is to deliver that powerful, dangerous weapon to Lord Asriel - by the command of his dying father.But how can he go looking for Lord Asriel when Lyra is gone? Only with her help can he fathom the myriad plots and and intrigues that beset him. The two great powers of the many worlds are lining up for war, and Will must find Lyra, for together they are on their way to battle, an inevitable journey that will even take them to the world of the dead...",

    //         rating: 4.26,
    //         name: "Me Before You",
    //         genre: "Romance,Fiction,Contemporary,Womens Fiction,Chick Lit",
    //         image:
    //           "https://images.gr-assets.com/books/1357108762l/15507958.jpg",
    //       },
    //       {
    //         author: "Philip Pullman",
    //         description:
    //           "In the year 2045, reality is an ugly place. The only time teenage Wade Watts really feels alive is when he's jacked into the virtual utopia known as the OASIS. Wade's devoted his life to studying the puzzles hidden within this world's digital confines, puzzles that are based on their creator's obsession with the pop culture of decades past and that promise massive power and fortune to whoever can unlock them. When Wade stumbles upon the first clue, he finds himself beset by players willing to kill to take this ultimate prize. The race is on, and if Wade's going to survive, he'll have to win—and confront the real world he's always been so desperate to escape.",

    //         rating: 4.08,
    //         name: "The Amber Spyglass",
    //         genre: "Fantasy,Young Adult,Fiction",
    //         image: "https://images.gr-assets.com/books/1329189152l/18122.jpg",
    //       },
    //       {
    //         author: "Ernest Cline",
    //         description:
    //           "Thousands of miles away from the small township of 'Salem's Lot, two terrified people, a man and a boy, still share the secrets of those clapboard houses and tree-lined streets. They must return to 'Salem's Lot for a final confrontation with the unspeakable evil that lives on in the town.",

    //         rating: 4.29,
    //         name: "Ready Player One",
    //         genre:
    //           "Science Fiction,Fiction,Young Adult,Science Fiction,Dystopia,Fantasy",
    //         image: "https://images.gr-assets.com/books/1500930947l/9969571.jpg",
    //       },
    //       {
    //         author: "Alyson Noel",
    //         description:
    //           "This extraordinary historical novel, set in Medieval Paris under the twin towers of its greatest structure and supreme symbol, the cathedral of Notre-Dame, is the haunting drama of Quasimodo, the hunchback; Esmeralda, the gypsy dancer; and Claude Frollo, the priest tortured by the specter of his own damnation. Shaped by a profound sense of tragic irony, it is a work that gives full play to Victor Hugo's brilliant historical imagination and his remarkable powers of description.",

    //         rating: 3.59,
    //         name: "Evermore",
    //         genre: "Young Adult,Fantasy,Fantasy,Paranormal,Romance",
    //         image: "https://images.gr-assets.com/books/1362336360l/3975774.jpg",
    //       },
    //       {
    //         author: "David Mitchell",
    //         description:
    //           "I have a curseI have a giftI am a monsterI'm more than humanMy touch is lethalMy touch is powerI am their weaponI will fight backJuliette hasn’t touched anyone in exactly 264 days.The last time she did, it was an accident, but The Reestablishment locked her up for murder. No one knows why Juliette’s touch is fatal. As long as she doesn’t hurt anyone else, no one really cares. The world is too busy crumbling to pieces to pay attention to a 17-year-old girl. Diseases are destroying the population, food is hard to find, birds don’t fly anymore, and the clouds are the wrong color.The Reestablishment said their way was the only way to fix things, so they threw Juliette in a cell. Now so many people are dead that the survivors are whispering war – and The Reestablishment has changed its mind. Maybe Juliette is more than a tortured soul stuffed into a poisonous body. Maybe she’s exactly what they need right now.Juliette has to make a choice: Be a weapon. Or be a warrior.",

    //         rating: 4.02,
    //         name: "Cloud Atlas",
    //         genre:
    //           "Fiction,Science Fiction,Fantasy,Historical,Historical Fiction",
    //         image: "https://images.gr-assets.com/books/1406383769l/49628.jpg",
    //       },
    //       {
    //         author: "Tahereh Mafi",
    //         description:
    //           "Captured by a giant! The BFG is no ordinary bone-crunching giant. He is far too nice and jumbly. It's lucky for Sophie that he is. Had she been carried off in the middle of the night by the Bloodbottler, the Fleshlumpeater, the Bonecruncher, or any of the other giants-rather than the BFG-she would have soon become breakfast. When Sophie hears that they are flush-bunking off in England to swollomp a few nice little chiddlers, she decides she must stop them once and for all. And the BFG is going to help her!",

    //         rating: 3.99,
    //         name: "Shatter Me",
    //         genre: "Young Adult,Science Fiction,Dystopia,Romance,Fantasy",
    //         image:
    //           "https://images.gr-assets.com/books/1310649047l/10429045.jpg",
    //       },
    //       {
    //         author: "Rohinton Mistry",
    //         description:
    //           "From the author of Outlander... a magnificent epic that once again sweeps us back in time to the drama and passion of 18th-century Scotland...For twenty years Claire Randall has kept her secrets. But now she is returning with her grown daughter to Scotland's majestic mist-shrouded hills. Here Claire plans to reveal a truth as stunning as the events that gave it birth: about the mystery of an ancient circle of standing stones ...about a love that transcends the boundaries of time ...and about James Fraser, a Scottish warrior whose gallantry once drew a young Claire from the security of her century to the dangers of his ....Now a legacy of blood and desire will test her beautiful copper-haired daughter, Brianna, as Claire's spellbinding journey of self-discovery continues in the intrigue-ridden Paris court of Charles Stuart ...in a race to thwart a doomed Highlands uprising ...and in a desperate fight to save both the child and the man she loves....",

    //         rating: 4.35,
    //         name: "A Fine Balance",
    //         genre: "Fiction,Cultural,India,Historical,Historical Fiction",
    //         image: "https://images.gr-assets.com/books/1386925449l/5211.jpg",
    //       },
    //       {
    //         author: "Diana Gabaldon",
    //         description:
    //           "Darwin's theory of natural selection issued a profound challenge to orthodox thought and belief: no being or species has been specifically created; all are locked into a pitiless struggle for existence, with extinction looming for those not fitted for the task. Yet The Origin of Species (1859) is also a humane and inspirational vision of ecological interrelatedness, revealing the complex mutual interdependencies between animal and plant life, climate and physical environment, and - by implication - within the human world. Written for the general reader, in a style which combines the rigour of science with the subtlety of literature, The Origin of Species remains one of the founding documents of the modern age.",

    //         rating: 4.32,
    //         name: "Dragonfly in Amber",
    //         genre:
    //           "Historical,Historical Fiction,Romance,Fantasy,Fiction,Science Fiction,Time Travel,Historical",
    //         image: "https://images.gr-assets.com/books/1456114344l/5364.jpg",
    //       },
    //       {
    //         author: "Tennessee Williams",
    //         description:
    //           "Six unforgettable kids — with no families, no homes — are running for their lives. Max Ride and her best friends have the ability to fly. And that's just the beginning of their amazing powers. But they don't know where they come from, who's hunting them, why they are different from all other humans... and if they're meant to save mankind — or destroy it.",

    //         rating: 3.98,
    //         name: "A Streetcar Named Desire",
    //         genre: "Plays,Classics,Drama,Fiction,Academic,School",
    //         image: "https://images.gr-assets.com/books/1389153133l/12220.jpg",
    //       },
    //       {
    //         author: "James Patterson",
    //         description:
    //           "To five-year-old-Jack, Room is the world....Told in the inventive, funny, and poignant voice of Jack, Room is a celebration of resilience - and a powerful story of a mother and son whose love lets them survive the impossible.To five-year-old Jack, Room is the entire world. It is where he was born and grew up; it's where he lives with his Ma as they learn and read and eat and sleep and play. At night, his Ma shuts him safely in the wardrobe, where he is meant to be asleep when Old Nick visits. Room is home to Jack, but to Ma, it is the prison where Old Nick has held her captive for seven years. Through determination, ingenuity, and fierce motherly love, Ma has created a life for Jack. But she knows it's not enough...not for her or for him. She devises a bold escape plan, one that relies on her young son's bravery and a lot of luck. What she does not realize is just how unprepared she is for the plan to actually work. Told entirely in the language of the energetic, pragmatic five-year-old Jack, Room is a celebration of resilience and the limitless bond between parent and child, a brilliantly executed novel about what it means to journey from one world to another.",

    //         rating: 4.08,
    //         name: "The Angel Experiment",
    //         genre: "Young Adult,Fantasy,Science Fiction",
    //         image: "https://images.gr-assets.com/books/1339277875l/13152.jpg",
    //       },
    //       {
    //         author: "Emma Donoghue",
    //         description:
    //           "'For a salesman, there is no rock bottom to life. He don't put a bolt to a nut, he don't tell you the law or give you medicine. He's a man way out there in the blue, riding on a smile and a shoeshine.'Willy Loman has been a salesman for 34 years. At 60, he is cast aside, his usefulness now exhausted. With no future to dream about he must face the crushing disappointments of his past. He takes one final brave action, but is he heroic at last, or a self-deluding fool?",

    //         rating: 4.04,
    //         name: "Room",
    //         genre: "Fiction,Contemporary,Adult,Adult Fiction",
    //         image: "https://images.gr-assets.com/books/1344265419l/7937843.jpg",
    //       },
    //       {
    //         author: "Arthur Miller",
    //         description:
    //           "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind themIn ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion.When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom.The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider.",

    //         rating: 3.5,
    //         name: "Death of a Salesman",
    //         genre:
    //           "Academic,School,Classics,Academic,Read For School,Plays,Plays,Theatre,Young Adult,High School",
    //         image: "https://images.gr-assets.com/books/1469024140l/12898.jpg",
    //       },
    //       {
    //         author: "Philip Pullman",
    //         description:
    //           "In Breakfast of Champions, one of Kurt Vonnegut’s  most beloved characters, the aging writer Kilgore Trout, finds to his horror that a Midwest car dealer is taking his fiction as truth. What follows is murderously funny satire, as Vonnegut looks at war, sex, racism, success, politics, and pollution in America and reminds us how to see the truth.",

    //         rating: 4.12,
    //         name: "The Subtle Knife",
    //         genre: "Fantasy,Young Adult,Fiction",
    //         image: "https://images.gr-assets.com/books/1505766360l/119324.jpg",
    //       },
    //       {
    //         author: "Kurt Vonnegut",
    //         description:
    //           "In a world where ash falls from the sky, and mist dominates the night, an evil cloaks the land and stifles all life. The future of the empire rests on the shoulders of a troublemaker and his young apprentice. Together, can they fill the world with color once more?In Brandon Sanderson's intriguing tale of love, loss, despair and hope, a new kind of magic enters the stage — Allomancy, a magic of the metals.",

    //         rating: 4.08,
    //         name: "Breakfast of Champions",
    //         genre: "Fiction,Classics,Science Fiction,Humor,Literature",
    //         image: "https://images.gr-assets.com/books/1327934446l/4980.jpg",
    //       },
    //       {
    //         author: "Brandon Sanderson",
    //         description:
    //           "Patrick Bateman is twenty-six and he works on Wall Street, he is handsome, sophisticated, charming and intelligent. He is also a psychopath. Taking us to head-on collision with America's greatest dream—and its worst nightmare—American Psycho is bleak, bitter, black comedy about a world we all recognise but do not wish to confront.",

    //         rating: 4.44,
    //         name: "The Final Empire",
    //         genre: "Fantasy,Fiction,Fantasy,Epic Fantasy,Fantasy,High Fantasy",
    //         image: "https://images.gr-assets.com/books/1480717416l/68428.jpg",
    //       },
    //       {
    //         author: "Bret Easton Ellis",
    //         description:
    //           "In nineteenth-century China, in a remote Hunan county, a girl named Lily, at the tender age of seven, is paired with a laotong, “old same,” in an emotional match that will last a lifetime. The laotong, Snow Flower, introduces herself by sending Lily a silk fan on which she’s painted a poem in nu shu, a unique language that Chinese women created in order to communicate in secret, away from the influence of men.As the years pass, Lily and Snow Flower send messages on fans, compose stories on handkerchiefs, reaching out of isolation to share their hopes, dreams, and accomplishments. Together, they endure the agony of foot-binding, and reflect upon their arranged marriages, shared loneliness, and the joys and tragedies of motherhood. The two find solace, developing a bond that keeps their spirits alive. But when a misunderstanding arises, their deep friendship suddenly threatens to tear apart.",

    //         rating: 3.82,
    //         name: "American Psycho",
    //         genre: "Fiction,Horror,Classics,Thriller,Mystery,Crime",
    //         image: "https://images.gr-assets.com/books/1436934349l/28676.jpg",
    //       },
    //       {
    //         author: "Lisa See",
    //         description:
    //           "A sublime and seductive reading experience. Brilliantly conceived and masterfully written, this enormously engaging portrait of a most beguiling Southern city has become a modern classic.Shots rang out in Savannah's grandest mansion in the misty, early morning hours of May 2, 1981. Was it murder or self-defense? For nearly a decade, the shooting and its aftermath reverberated throughout this hauntingly beautiful city of moss-hung oaks and shaded squares. John Berendt's sharply observed, suspenseful, and witty narrative reads like a thoroughly engrossing novel, and yet it is a work of nonfiction. Berendt skillfully interweaves a hugely entertaining first-person account of life in this isolated remnant of the Old South with the unpredictable twists and turns of a landmark murder case.It is a spellbinding story peopled by a gallery of remarkable characters: the well-bred society ladies of the Married Woman's Card Club; the turbulent young redneck gigolo; the hapless recluse who owns a bottle of poison so powerful it could kill every man, woman, and child in Savannah; the aging and profane Southern belle who is the soul of pampered self-absorption; the uproariously funny black drag queen; the acerbic and arrogant antiques dealer; the sweet-talking, piano-playing con artist; young blacks dancing the minuet at the black debutante ball; and Minerva, the voodoo priestess who works her magic in the graveyard at midnight. These and other Savannahians act as a Greek chorus, with Berendt revealing the alliances, hostilities, and intrigues that thrive in a town where everyone knows everyone else.",

    //         rating: 4.06,
    //         name: "Snow Flower and the Secret Fan",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,Cultural,China,Historical,Cultural,Asia",
    //         image: "https://images.gr-assets.com/books/1327880508l/1103.jpg",
    //       },
    //       {
    //         author: "John Berendt",
    //         description:
    //           "Goethe’s masterpiece and perhaps the greatest work in German literature, Faust has made the legendary German alchemist one of the central myths of the Western world. Here indeed is a monumental Faust, an audacious man boldly wagering with the devil, Mephistopheles, that no magic, sensuality, experience, or knowledge can lead him to a moment he would wish to last forever. Here, in Faust, Part I, the tremendous versatility of Goethe’s genius creates some of the most beautiful passages in literature. Here too we experience Goethe’s characteristic humor, the excitement and eroticism of the witches’ Walpurgis Night, and the moving emotion of Gretchen’s tragic fate.This authoritative edition, which offers Peter Salm’s wonderfully readable translation as well as the original German on facing pages, brings us Faust in a vital, rhythmic American idiom that carefully preserves the grandeur, integrity, and poetic immediacy of Goethe’s words.",

    //         rating: 3.91,
    //         name: "Midnight in the Garden of Good and Evil",
    //         genre: "Nonfiction,Crime,True Crime,Mystery,Mystery,Crime",
    //         image: "https://images.gr-assets.com/books/1427166915l/386187.jpg",
    //       },
    //       {
    //         author: "Annie Proulx",
    //         description:
    //           "A gargantuan, mind-altering comedy about the Pursuit of Happiness in America. Set in an addicts' halfway house and a tennis academy, and featuring the most endearingly screwed-up family to come along in recent fiction, Infinite Jest explores essential questions about what entertainment is and why it has come to so dominate our lives; about how our desire for entertainment affects our need to connect with other people; and about what the pleasures we choose say about who we are. Equal parts philosophical quest and screwball comedy, Infinite Jest bends every rule of fiction without sacrificing for a moment its own entertainment value. It is an exuberant, uniquely American exploration of the passions that make us human—and one of those rare books that renew the idea of what a novel can do.",

    //         rating: 3.85,
    //         name: "The Shipping News",
    //         genre: "Fiction,Contemporary,Literature",
    //         image: "https://images.gr-assets.com/books/1514344704l/7354.jpg",
    //       },
    //       {
    //         author: "David Foster Wallace",
    //         description:
    //           "Filósofo italiano del renacimiento, Maquiavelo es uno de los fundadores de la teoría política. Además de el príncipe, fue autor de muchos estudios sobre la vida política de la República romana, Florencia y otros estados. Junto a Leonardo, es el prototipo del hombre del Renacimiento.El príncipe es uno de los clásicos de la filosofía política. En esta obra, Maquiavelo describe cómo debe actuar el príncipe, cómo tiene que comportarse si quiere conseguir el poder y mantenerse en él. Es un libro de instrucciones para el buen gobernante.",

    //         rating: 4.31,
    //         name: "Infinite Jest",
    //         genre: "Fiction,Classics,Abandoned,Literature,Novels",
    //         image: "https://images.gr-assets.com/books/1446876799l/6759.jpg",
    //       },
    //       {
    //         author: "Stephanie Perkins",
    //         description:
    //           "HOUDINI HEART harkens back to the masters of suspenseful supernatural horror: Poe, Lovecraft, Shirley Jackson, but speaks with a wholly fresh voice. Once caught in its pages, there's no escaping Longfellow's terrible tale. Weeks ago, she was one of Hollywood's biggest writers, wed to one of its greatest stars. The doting mother of their golden child. But now? She's alone, tortured by a horrifying secret no woman could bear. Pursued by those she can't outrun, anguished by a guilt she can't endure, and driven close to madness, she flees to the one place she's ever called home: a small town in Vermont where River House still stands. To a child, the splendid hotel was mysterious and magical and all its glamorous guests knew delicious secrets. Cocooned in its walls, she will write one last book. Her atonement? Or her suicide note? But life is never as you dream it, and River House isn't what she'd always imagined it was. Intense, literary, and harrowing, Houdini Heart is a tale of bone-chilling horror, emotional torment, and psychological terror. Gripped by River House, trapped in an aging hotel of mirrors only Houdini could escape, how much can haunt a mind before it too is only a thing once imagined? A haunting and disturbing journey through the psyche.-Erika Mailman, Author of The Witch's Trinity",

    //         rating: 4.04,
    //         name: "Anna and the French Kiss",
    //         genre: "Young Adult,Romance,Contemporary,Womens Fiction,Chick Lit",
    //         image: "https://images.gr-assets.com/books/1358271931l/6936382.jpg",
    //       },
    //       {
    //         author: "Ki Longfellow",
    //         description:
    //           "From #1 New York Times bestselling author Brandon Sanderson, The Way of Kings, Book One of the Stormlight Archive begins an incredible new saga of epic proportion.Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.One such war rages on a ruined landscape called the Shattered Plains. There, Kaladin, who traded his medical apprenticeship for a spear to protect his little brother, has been reduced to slavery. In a war that makes no sense, where ten armies fight separately against a single foe, he struggles to save his men and to fathom the leaders who consider them expendable.Brightlord Dalinar Kholin commands one of those other armies. Like his brother, the late king, he is fascinated by an ancient text called The Way of Kings. Troubled by over-powering visions of ancient times and the Knights Radiant, he has begun to doubt his own sanity.Across the ocean, an untried young woman named Shallan seeks to train under an eminent scholar and notorious heretic, Dalinar's niece, Jasnah. Though she genuinely loves learning, Shallan's motives are less than pure. As she plans a daring theft, her research for Jasnah hints at secrets of the Knights Radiant and the true cause of the war.The result of over ten years of planning, writing, and world-building, The Way of Kings is but the opening movement of the Stormlight Archive, a bold masterpiece in the making.Speak again the ancient oaths:Life before death.Strength before weakness.Journey before Destination.and return to men the Shards they once bore.The Knights Radiant must stand again.",

    //         rating: 4.23,
    //         name: "Houdini Heart",
    //         genre: "Horror,Fantasy,Fiction,Mystery,Magical Realism,Literature",
    //         image:
    //           "https://images.gr-assets.com/books/1510418043l/11324204.jpg",
    //       },
    //       {
    //         author: "Brandon Sanderson",
    //         description:
    //           "Around the world, black hand prints are appearing on doorways, scorched there by winged strangers who have crept through a slit in the sky.In a dark and dusty shop, a devil’s supply of human teeth grows dangerously low.And in the tangled lanes of Prague, a young art student is about to be caught up in a brutal otherworldly war.Meet Karou. She fills her sketchbooks with monsters that may or may not be real, she’s prone to disappearing on mysterious errands, she speaks many languages - not all of them human - and her bright blue hair actually grows out of her head that color. Who is she? That is the question that haunts her, and she’s about to find out.When beautiful, haunted Akiva fixes fiery eyes on her in an alley in Marrakesh, the result is blood and starlight, secrets unveiled, and a star-crossed love whose roots drink deep of a violent past. But will Karou live to regret learning the truth about herself?",

    //         rating: 4.65,
    //         name: "The Way of Kings",
    //         genre: "Fantasy,Fiction,Fantasy,Epic Fantasy,Fantasy,High Fantasy",
    //         image: "https://images.gr-assets.com/books/1388184640l/7235533.jpg",
    //       },
    //       {
    //         author: "Laini Taylor",
    //         description:
    //           "Armed with only his wits and his cunning, one man recklessly defies the French revolutionaries and rescues scores of innocent men, women, and children from the deadly guillotine. His friends and foes know him only as the Scarlet Pimpernel. But the ruthless French agent Chauvelin is sworn to discover his identity and to hunt him down.",

    //         rating: 4.03,
    //         name: "Daughter of Smoke & Bone",
    //         genre:
    //           "Fantasy,Young Adult,Romance,Fantasy,Paranormal,Paranormal,Angels",
    //         image: "https://images.gr-assets.com/books/1461353773l/8490112.jpg",
    //       },
    //       {
    //         author: "Emmuska Orczy",
    //         description:
    //           "Sometimes discovering the truth can leave you more hopeless than believing the lies…That’s what seventeen-year-old Sky realizes after she meets Dean Holder. A guy with a reputation that rivals her own and an uncanny ability to invoke feelings in her she’s never had before. He terrifies her and captivates her all in the span of just one encounter, and something about the way he makes her feel sparks buried memories from a past that she wishes could just stay buried.Sky struggles to keep him at a distance knowing he’s nothing but trouble, but Holder insists on learning everything about her. After finally caving to his unwavering pursuit, Sky soon finds that Holder isn’t at all who he’s been claiming to be. When the secrets he’s been keeping are finally revealed, every single facet of Sky’s life will change forever.",

    //         rating: 4.07,
    //         name: "The Scarlet Pimpernel",
    //         genre:
    //           "Classics,Historical,Historical Fiction,Fiction,Adventure,Romance,Historical",
    //         image: "https://images.gr-assets.com/books/1406764899l/136116.jpg",
    //       },
    //       {
    //         author: "Chaim Potok",
    //         description:
    //           "Do you know your desert-island, all-time, top five most memorable split-ups?Rob does. He keeps a list, in fact. But Laura isn't on it - even though she's just become his latest ex. He's got his life back, you see. He can just do what he wants when he wants: like listen to whatever music he likes, look up the girls that are on his list, and generally behave as if Laura never mattered. But Rob finds he can't move on. He's stuck in a really deep groove - and it's called Laura. Soon, he's asking himself some big questions: about love, about life - and about why we choose to share ours with the people we do.",

    //         rating: 4.04,
    //         name: "The Chosen",
    //         genre:
    //           "Fiction,Classics,Historical,Historical Fiction,Young Adult,Literature,Jewish,Religion,Literature",
    //         image: "https://images.gr-assets.com/books/1403191327l/187181.jpg",
    //       },
    //       {
    //         author: "Nick Hornby",
    //         description:
    //           "Such wonderful children. Such a beautiful mother. Such a lovely house. Such endless terror!It wasn't that she didn't love her children. She did. But there was a fortune at stake—a fortune that would assure their later happiness if she could keep the children a secret from her dying father.So she and her mother hid her darlings away in an unused attic.Just for a little while.But the brutal days swelled into agonizing years. Now Cathy, Chris, and the twins wait in their cramped and helpless world, stirred by adult dreams, adult desires, served a meager sustenance by an angry, superstitious grandmother who knows that the Devil works in dark and devious ways. Sometimes he sends children to do his work—children who—one by one—must be destroyed....'Way upstairs there are four secrets hidden. Blond, beautiful, innocent struggling to stay alive....",

    //         rating: 3.94,
    //         name: "High Fidelity",
    //         genre: "Fiction,Music,Contemporary,Humor,Romance",
    //         image: "https://images.gr-assets.com/books/1327928082l/285092.jpg",
    //       },
    //       {
    //         author: "V.C. Andrews",
    //         description:
    //           "In this dazzling and long-awaited conclusion to the acclaimed Mortal Instruments series, Clary and her friends fight the greatest evil they have ever faced: Clary's own brother.Sebastian Morgenstern is on the move, systematically turning Shadowhunter against Shadowhunter. Bearing the Infernal Cup, he transforms Shadowhunters into creatures out of nightmare, tearing apart families and lovers as the ranks of his Endarkened army swell.The embattled Shadowhunters withdraw to Idris - but not even the famed demon towers of Alicante can keep Sebastian at bay. And with the Nephilim trapped in Idris, who will guard the world against demons?When one of the greatest betrayals the Nephilim have ever known is revealed, Clary, Jace, Isabelle, Simon, and Alec must flee - even if their journey takes them deep into the demon realms, where no Shadowhunter has set foot before, and from which no human being has ever returned...Love will be sacrificed and lives lost in the terrible battle for the fate of the word in the thrilling final installment of the classic urban fantasy series The Mortal Instruments!",

    //         rating: 3.8,
    //         name: "Flowers in the Attic",
    //         genre: "Fiction,Horror,Mystery",
    //         image: "https://images.gr-assets.com/books/1327880853l/43448.jpg",
    //       },
    //       {
    //         author: "Cassandra Clare",
    //         description:
    //           "The Tales of Beedle the Bard, contains five richly diverse fairy tales, each with it's own magical character, that will variously bring delight, laughter and the thrill of mortal peril.Additional notes for each story penned by Professor Albus Dumbledore will be enjoyed by Muggles and wizards alike, as the Professor muses on the morals illuminated by the tales, and reveals snippets of information about life at Hogwarts.A uniquely magical volume, with illustrations by the author, J. K. Rowling, that will be treasured for years to come.",

    //         rating: 4.47,
    //         name: "City of Heavenly Fire",
    //         genre: "Fantasy,Young Adult,Fantasy,Paranormal,Romance",
    //         image: "https://images.gr-assets.com/books/1460477794l/8755785.jpg",
    //       },
    //       {
    //         author: "J.K. Rowling",
    //         description:
    //           "A gripping tale of human unrelieved horror, of survival and resilience, and of the ways in which humankind confronts death, The Plague is at once a masterfully crafted novel, eloquently understated and epic in scope, and a parable of ageless moral resonance, profoundly relevant to our times. In Oran, a coastal town in North Africa, the plague begins as a series of portents, unheeded by the people. It gradually becomes a omnipresent reality, obliterating all traces of the past and driving its victims to almost unearthly extremes of suffering, madness, and compassion.",

    //         rating: 4.07,
    //         name: "The Tales of Beedle the Bard",
    //         genre: "Fantasy,Young Adult,Fiction,Short Stories",
    //         image: "https://images.gr-assets.com/books/1373467575l/3950967.jpg",
    //       },
    //       {
    //         author: "Ally Condie",
    //         description:
    //           "In nineteen minutes, you can mow the front lawn, color your hair, watch a third of a hockey game. In nineteen minutes, you can bake scones or get a tooth filled by a dentist; you can fold laundry for a family of five....In nineteen minutes, you can stop the world, or you can just jump off it. In nineteen minutes, you can get revenge. Sterling is a small, ordinary New Hampshire town where nothing ever happens -- until the day its complacency is shattered by a shocking act of violence. In the aftermath, the town's residents must not only seek justice in order to begin healing but also come to terms with the role they played in the tragedy. For them, the lines between truth and fiction, right and wrong, insider and outsider have been obscured forever. Josie Cormier, the teenage daughter of the judge sitting on the case, could be the state's best witness, but she can't remember what happened in front of her own eyes. And as the trial progresses, fault lines between the high school and the adult community begin to show, destroying the closest of friendships and families. Nineteen Minutes is New York Times bestselling author Jodi Picoult's most raw, honest, and important novel yet. Told with the straightforward style for which she has become known, it asks simple questions that have no easy answers: Can your own child become a mystery to you? What does it mean to be different in our society? Is it ever okay for a victim to strike back? And who -- if anyone -- has the right to judge someone else?",

    //         rating: 3.67,
    //         name: "Matched",
    //         genre: "Young Adult,Science Fiction,Dystopia,Romance",
    //         image: "https://images.gr-assets.com/books/1367706191l/7735333.jpg",
    //       },
    //       {
    //         author: "Jodi Picoult",
    //         description:
    //           "Librarian's note: See alternate cover edition of ISBN 0571225381 here.In the summer of 1956, Stevens, a long-serving butler at Darlington Hall, decides to take a motoring trip through the West Country. The six-day excursion becomes a journey into the past of Stevens and England, a past that takes in fascism, two world wars, and an unrealised love between the butler and his housekeeper.",

    //         rating: 4.11,
    //         name: "Nineteen Minutes",
    //         genre: "Fiction,Contemporary,Womens Fiction,Chick Lit",
    //         image: "https://images.gr-assets.com/books/1348577596l/14866.jpg",
    //       },
    //       {
    //         author: "Jeffrey Eugenides",
    //         description:
    //           "Alternate covers can be found here.With A Feast for Crows, Martin delivers the long-awaited fourth volume of the landmark series that has redefined imaginative fiction and stands as a modern masterpiece in the making.After centuries of bitter strife, the seven powers dividing the land have beaten one another into an uneasy truce. But it's not long before the survivors, outlaws, renegades, and carrion eaters of the Seven Kingdoms gather. Now, as the human crows assemble over a banquet of ashes, daring new plots and dangerous new alliances are formed while surprising faces—some familiar, others only just appearing—emerge from an ominous twilight of past struggles and chaos to take up the challenges of the terrible times ahead. Nobles and commoners, soldiers and sorcerers, assassins and sages, are coming together to stake their fortunes...and their lives. For at a feast for crows, many are the guests—but only a few are the survivors.",

    //         rating: 3.84,
    //         name: "The Virgin Suicides",
    //         genre: "Fiction,Contemporary,Young Adult,Classics",
    //         image: "https://images.gr-assets.com/books/1319032910l/10956.jpg",
    //       },
    //       {
    //         author: "Sarah J. Maas",
    //         description:
    //           "An epic novel of the violence and depravity that attended America's westward expansion, Blood Meridian brilliantly subverts the conventions of the Western novel and the mythology of the wild west. Based on historical events that took place on the Texas-Mexico border in the 1850s, it traces the fortunes of the Kid, a fourteen-year-old Tennesseean who stumbles into the nightmarish world where Indians are being murdered and the market for their scalps is thriving.Publisher's Note: The 25th Anniversary Edition has been reset, causing the text to reflow. Page references based on earlier editions will no longer apply, so Vintage Books has compiled the following chart as a conversion aid. Download the chart by copying and pasting the following link into your browser:http://knopfdoubleday.com/marketing/B...",

    //         rating: 4.69,
    //         name: "A Court of Mist and Fury",
    //         genre: "Fantasy,Romance,Young Adult,New Adult",
    //         image:
    //           "https://images.gr-assets.com/books/1485259138l/17927395.jpg",
    //       },
    //       {
    //         author: "Cormac McCarthy",
    //         description:
    //           "Twelve-year-old Artemis Fowl is a millionaire, a genius—and, above all, a criminal mastermind. But even Artemis doesn't know what he's taken on when he kidnaps a fairy, Captain Holly Short of the LEPrecon Unit. These aren't the fairies of bedtime stories—they're dangerous! Full of unexpected twists and turns, Artemis Fowl is a riveting, magical adventure.",

    //         rating: 4.18,
    //         name: "Blood Meridian, or the Evening Redness in the West",
    //         genre:
    //           "Fiction,Westerns,Historical,Historical Fiction,Classics,Literature,Novels",
    //         image: "https://images.gr-assets.com/books/1453995760l/394535.jpg",
    //       },
    //       {
    //         author: "Eoin Colfer",
    //         description:
    //           "Winner of the 1921 Pulitzer Prize, The Age of Innocence is Edith Wharton’s masterful portrait of desire and betrayal during the sumptuous Golden Age of Old New York, a time when society people “dreaded scandal more than disease.”This is Newland Archer’s world as he prepares to marry the beautiful but conventional May Welland. But when the mysterious Countess Ellen Olenska returns to New York after a disastrous marriage, Archer falls deeply in love with her. Torn between duty and passion, Archer struggles to make a decision that will either courageously define his life—or mercilessly destroy it.",

    //         rating: 3.83,
    //         name: "Artemis Fowl",
    //         genre: "Fantasy,Young Adult,Fiction,Childrens",
    //         image: "https://images.gr-assets.com/books/1327945104l/249747.jpg",
    //       },
    //       {
    //         author: "Ransom Riggs",
    //         description:
    //           "The Matrix is a world within the world, a global consensus- hallucination, the representation of every byte of data in cyberspace . . .Case had been the sharpest data-thief in the business, until vengeful former employers crippled his nervous system. But now a new and very mysterious employer recruits him for a last-chance run. The target: an unthinkably powerful artificial intelligence orbiting Earth in service of the sinister Tessier-Ashpool business clan. With a dead man riding shotgun and Molly, mirror-eyed street-samurai, to watch his back, Case embarks on an adventure that ups the ante on an entire genre of fiction.Hotwired to the leading edges of art and technology, Neuromancer ranks with 1984 and Brave New World as one of the century's most potent visions of the future.",

    //         rating: 3.9,
    //         name: "Miss Peregrine's Home for Peculiar Children",
    //         genre: "Fantasy,Young Adult,Fiction,Fantasy,Paranormal",
    //         image: "https://images.gr-assets.com/books/1472782916l/9460487.jpg",
    //       },
    //       {
    //         author: "William Gibson",
    //         description:
    //           "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he’s sure he’ll be the first person to die there.After a dust storm nearly kills him and forces his crew to evacuate while thinking him dead, Mark finds himself stranded and completely alone with no way to even signal Earth that he’s alive—and even if he could get word out, his supplies would be gone long before a rescue could arrive. Chances are, though, he won’t have time to starve to death. The damaged machinery, unforgiving environment, or plain-old “human error” are much more likely to kill him first. But Mark isn’t ready to give up yet. Drawing on his ingenuity, his engineering skills — and a relentless, dogged refusal to quit — he steadfastly confronts one seemingly insurmountable obstacle after the next. Will his resourcefulness be enough to overcome the impossible odds against him?",

    //         rating: 3.89,
    //         name: "Neuromancer",
    //         genre: "Science Fiction,Fiction,Science Fiction,Cyberpunk",
    //         image: "https://images.gr-assets.com/books/1167348726l/22328.jpg",
    //       },
    //       {
    //         author: "Andy Weir",
    //         description:
    //           "California's gold country, 1850. A time when men sold their souls for a bag of gold and women sold their bodies for a place to sleep.Angel expects nothing from men but betrayal. Sold into prostitution as a child she survives by keeping her hatred alive. And what she hates most are the men who use her, leaving her empty and dead inside.Then she meets Michael Hosea. A man who seeks his Father's heart in everything, Michael obeys God's call to marry Angel and to love her unconditionally. Slowly, day by day, he defies Angel's every bitter expectation, until despite her resistance, her frozen heart begins to thaw.But with her unexpected softening come overwhelming feelings of unworthiness and fear. And so Angel runs. Back to the darkness, away from her husband's pursuing love, terrified of the truth she no longer can deny: Her final healing must come from the One who loves her even more than Michael does ... the One who will never let her go.",

    //         rating: 4.4,
    //         name: "The Martian",
    //         genre: "Science Fiction,Fiction",
    //         image:
    //           "https://images.gr-assets.com/books/1413706054l/18007564.jpg",
    //       },
    //       {
    //         author: "Francine Rivers",
    //         description:
    //           "Un abogado, Gabriel John Utterson, investiga la extraña relación entre su viejo amigo, el doctor. Henry Jekyll, y el misántropo Edward Hyde. En realidad, Jekyll es un científico que crea una poción o bebida que tiene la capacidad de separar la parte más humana del lado más maléfico de una persona. Cuando Jekyll bebe esta mezcla se convierte en Edward Hyde, un criminal capaz de cualquier atrocidad. Desesperado por la necesidad cada vez más frecuente e incontrolable de convertirse en ese ser malvado, el doctor Jekyll decide suicidarse.",

    //         rating: 4.49,
    //         name: "Redeeming Love",
    //         genre:
    //           "Christian Fiction,Christian,Fiction,Romance,Historical,Historical Fiction,Historical",
    //         image: "https://images.gr-assets.com/books/1166475085l/11422.jpg",
    //       },
    //       {
    //         author: "Gregory David Roberts",
    //         description:
    //           "Erik Larson's gifts as a storyteller are magnificently displayed in this rich narrative of the master builder, the killer, and the great fair that obsessed them both.Two men, each handsome and unusually adept at his chosen work, embodied an element of the great dynamic that characterized America's rush toward the twentieth century. The architect was Daniel Hudson Burnham, the fair's brilliant director of works and the builder of many of the country's most important structures, including the Flatiron Building in New York and Union Station in Washington, D.C. The murderer was Henry H. Holmes, a young doctor who, in a malign parody of the White City, built his World's Fair Hotel just west of the fairgrounds—a torture palace complete with dissection table, gas chamber, and 3,000-degree crematorium. Burnham overcame tremendous obstacles and tragedies as he organized the talents of Frederick Law Olmsted, Charles McKim, Louis Sullivan, and others to transform swampy Jackson Park into the White City, while Holmes used the attraction of the great fair and his own satanic charms to lure scores of young women to their deaths. What makes the story all the more chilling is that Holmes really lived, walking the grounds of that dream city by the lake.The Devil in the White City draws the reader into a time of magic and majesty, made all the more appealing by a supporting cast of real-life characters, including Buffalo Bill, Theodore Dreiser, Susan B. Anthony, Thomas Edison, Archduke Francis Ferdinand, and others. In this book the smoke, romance, and mystery of the Gilded Age come alive as never before.",

    //         rating: 4.27,
    //         name: "Shantaram",
    //         genre: "Fiction,Cultural,India,Travel,Adventure",
    //         image: "https://images.gr-assets.com/books/1333482282l/33600.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "This work of art reflects life in Ireland at the turn of the last century, and by rejecting euphemism, reveals to the Irish their unromantic realities. Each of the 15 stories offers glimpses into the lives of ordinary Dubliners, and collectively they paint a portrait of a nation.",

    //         rating: 4.3,
    //         name: "11/22/1963",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Science Fiction,Science Fiction,Time Travel,Fantasy",
    //         image:
    //           "https://images.gr-assets.com/books/1327876792l/10644930.jpg",
    //       },
    //       {
    //         author: "Stephenie Meyer",
    //         description:
    //           "From the Autobiography of Tiberius Claudius, Born 10 B.C., Murdered and Deified A.D. 54. Set in the first century A.D. in Rome and written as an autobiographical memoir, this colorful story of the life of the Roman emperor Claudius stands as one of the modern classics of historical fiction.Physically weak and afflicted with stuttering, Claudius is initially despised and dismissed as an idiot. Shunted to the background of imperial affairs by his embarrassed royal family, he becomes a scholar and historian, while palace intrigues and murders surround him. Observing these dramas from beyond the public eye, Claudius escapes the cruelties inflicted on the rest of the royal family by its own members and survives to become emperor of Rome in A.D. 41.",

    //         rating: 3.79,
    //         name: "The Twilight Collection",
    //         genre:
    //           "Fantasy,Young Adult,Paranormal,Vampires,Romance,Fiction,Fantasy,Paranormal,Romance,Paranormal Romance,Fantasy,Supernatural,Young Adult,Teen,Shapeshifters,Werewolves",
    //         image: "https://images.gr-assets.com/books/1388187657l/690926.jpg",
    //       },
    //       {
    //         author: "E.M. Forster",
    //         description:
    //           "Hazel stands at a crossroads. She and the remaining crew of the Argo II could return home with the Athena Parthenos statue and try to stop Camp Half-Blood and Camp Jupiter from going to war. Or they could continue their quest to find the House of Hades, where they might be able to open the Doors of Death, rescue their friends Percy and Annabeth from Tartarus, and prevent monsters from being reincarnated in the mortal world. Whichever road they decide to take, they have to hurry, because time is running out. Gaea, the bloodthirsty Earth Mother, has set the date of August 1 for her rise to power.Annabeth and Percy are overwhelmed. How will the two of them make it through Tartarus? Starving, thirsty, and in pain, they are barely able to stumble on in the dark and poisonous landscape that holds new horrors at every turn. They have no way of locating the Doors of Death. Even if they did, a legion of Gaea's strongest monsters guards the Doors on the Tartarus side. Annabeth and Percy can't exactly launch a frontal assault.Despite the terrible odds, Hazel, Annabeth, Percy, and the other demigods of the prophecy know that there is only one choice: to attempt the impossible. Not just for themselves, but for everyone they love. Even though love can be the riskiest choice of all.Join the demigods as they face their biggest challenges yet in The House of Hades, the hair-raising penultimate book in the best-selling Heroes of Olympus series.",

    //         rating: 3.9,
    //         name: "A Room with a View",
    //         genre: "Classics,Fiction,Romance,Literature",
    //         image: "https://images.gr-assets.com/books/1388781285l/3087.jpg",
    //       },
    //       {
    //         author: "Rick Riordan",
    //         description:
    //           "Sent by their mother to live with their devout, self-sufficient grandmother in a small Southern town, Maya and her brother, Bailey, endure the ache of abandonment and the prejudice of the local powhitetrash. At eight years old and back at her mother’s side in St. Louis, Maya is attacked by a man many times her age—and has to live with the consequences for a lifetime. Years later, in San Francisco, Maya learns that love for herself, the kindness of others, her own strong spirit, and the ideas of great authors (I met and fell in love with William Shakespeare) will allow her to be free instead of imprisoned.Poetic and powerful, I Know Why the Caged Bird Sings will touch hearts and change minds for as long as people read.",

    //         rating: 4.55,
    //         name: "The House of Hades",
    //         genre: "Fantasy,Young Adult,Fantasy,Mythology",
    //         image:
    //           "https://images.gr-assets.com/books/1464201430l/12127810.jpg",
    //       },
    //       {
    //         author: "Maya Angelou",
    //         description:
    //           "In the aftermath of a colossal battle, the future of the Seven Kingdoms hangs in the balance—beset by newly emerging threats from every direction. In the east, Daenerys Targaryen, the last scion of House Targaryen, rules with her three dragons as queen of a city built on dust and death. But Daenerys has thousands of enemies, and many have set out to find her. As they gather, one young man embarks upon his own quest for the queen, with an entirely different goal in mind.Fleeing from Westeros with a price on his head, Tyrion Lannister, too, is making his way to Daenerys. But his newest allies in this quest are not the rag-tag band they seem, and at their heart lies one who could undo Daenerys’s claim to Westeros forever.Meanwhile, to the north lies the mammoth Wall of ice and stone—a structure only as strong as those guarding it. There, Jon Snow, 998th Lord Commander of the Night’s Watch, will face his greatest challenge. For he has powerful foes not only within the Watch but also beyond, in the land of the creatures of ice.From all corners, bitter conflicts reignite, intimate betrayals are perpetrated, and a grand cast of outlaws and priests, soldiers and skinchangers, nobles and slaves, will face seemingly insurmountable obstacles. Some will fail, others will grow in the strength of darkness. But in a time of rising restlessness, the tides of destiny and politics will lead inevitably to the greatest dance of all.",

    //         rating: 4.21,
    //         name: "I Know Why the Caged Bird Sings",
    //         genre:
    //           "Nonfiction,Classics,Autobiography,Memoir,Biography,Biography,Autobiography",
    //         image: "https://images.gr-assets.com/books/1327957927l/13214.jpg",
    //       },
    //       {
    //         author: "George R.R. Martin",
    //         description:
    //           "The three laws of Robotics:1) A robot may not injure a human being or, through inaction, allow a human being to come to harm.2) A robot must obey orders given to it by human beings except where such orders would conflict with the First Law.3) A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.With these three, simple directives, Isaac Asimov changed our perception of robots forever when he formulated the laws governing their behavior. In I, Robot, Asimov chronicles the development of the robot through a series of interlinked stories: from its primitive origins in the present to its ultimate perfection in the not-so-distant future--a future in which humanity itself may be rendered obsolete.Here are stories of robots gone mad, of mind-read robots, and robots with a sense of humor. Of robot politicians, and robots who secretly run the world--all told with the dramatic blend of science fact and science fiction that has become Asimov's trademark.",

    //         rating: 4.32,
    //         name: "A Dance with Dragons",
    //         genre: "Fantasy,Fiction,Fantasy,Epic Fantasy",
    //         image:
    //           "https://images.gr-assets.com/books/1327885335l/10664113.jpg",
    //       },
    //       {
    //         author: "Isaac Asimov",
    //         description:
    //           "Carrie knew she should not use the terrifying power she possessed... But one night at her senior prom, Carrie was scorned and humiliated just one time too many, and in a fit of uncontrollable fury she turned her clandestine game into a weapon of horror and destruction...",

    //         rating: 4.18,
    //         name: "I, Robot",
    //         genre: "Science Fiction,Fiction,Classics,Short Stories",
    //         image: "https://images.gr-assets.com/books/1388321463l/41804.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "Among Shakespeare's plays, Hamlet is considered by many his masterpiece. Among actors, the role of Hamlet, Prince of Denmark, is considered the jewel in the crown of a triumphant theatrical career. Now Kenneth Branagh plays the leading role and co-directs a brillant ensemble performance. Three generations of legendary leading actors, many of whom first assembled for the Oscar-winning film Henry V, gather here to perform the rarely heard complete version of the play. This clear, subtly nuanced, stunning dramatization, presented by The Renaissance Theatre Company in association with Bbc Broadcasting, features such luminaries as Sir John Gielgud, Derek Jacobi, Emma Thompson and Christopher Ravenscroft. It combines a full cast with stirring music and sound effects to bring this magnificent Shakespearen classic vividly to life. Revealing new riches with each listening, this production of Hamlet is an invaluable aid for students, teachers and all true lovers of Shakespeare - a recording to be treasured for decades to come.",

    //         rating: 3.94,
    //         name: "Carrie",
    //         genre: "Horror,Fiction,Thriller,Fantasy,Paranormal",
    //         image: "https://images.gr-assets.com/books/1166254258l/10592.jpg",
    //       },
    //       {
    //         author: "C.S. Lewis",
    //         description:
    //           "I wasn't free of my past, not yet. Sydney's blood is special. That's because she's an alchemist - one of a group of humans who dabble in magic and serve to bridge the worlds of humans and vampires. They protect vampire secrets - and human lives. But the last encounter Sydney had with vampires got her in deep trouble with the other alchemists. And now with her allegiences in question, her future is on the line. When Sydney is torn from her bed in the middle of the night, at first she thinks she's still being punished for her complicated alliance with dhampir Rose Hathaway. But what unfolds is far worse. Jill Dragomir - the sister of Moroi Queen Lissa Dragomir - is in mortal danger, and the Moroi must send her into hiding. To avoid a civil war, Sydney is called upon to act as Jill's guardian and protector, posing as her roommate in the unlikeliest of places: a human boarding school in Palm Springs, California. The last thing Sydney wants is to be accused of sympathizing with vampires. And now she has to live with one. The Moroi court believe Jill and Sydney will be safe at Amberwood Prep, but threats, distractions, and forbidden romance lurk both outside - and within - the school grounds. Now that they're in hiding, the drama is only just beginning.",

    //         rating: 4.03,
    //         name: "The Last Battle",
    //         genre: "Fantasy,Fiction,Classics,Young Adult,Childrens",
    //         image: "https://images.gr-assets.com/books/1308814830l/84369.jpg",
    //       },
    //       {
    //         author: "Julie Kagawa",
    //         description:
    //           "Bleak House is a novel by Charles Dickens, published in 20 monthly installments between March 1852 and September 1853. It is held to be one of Dickens's finest novels, containing one of the most vast, complex and engaging arrays of minor characters and sub-plots in his entire canon.At the novel's core is long-running litigation in England's Court of Chancery, Jarndyce v Jarndyce, which has far-reaching consequences for all involved. The litigation, which already has taken many years and consumed between £60,000 and £70,000 in court costs, is emblematic of the failure of Chancery.Though Chancery lawyers and judges criticised Dickens's portrait of Chancery as exaggerated and unmerited, his novel helped to spur an ongoing movement that culminated in the enactment of legal reform in the 1870s.",

    //         rating: 3.91,
    //         name: "The Iron King",
    //         genre:
    //           "Young Adult,Romance,Fantasy,Paranormal,Fairies,Fae,Paranormal,Fairies,Fantasy,Urban Fantasy,Adventure",
    //         image: "https://images.gr-assets.com/books/1327877670l/6644117.jpg",
    //       },
    //       {
    //         author: "Dalton Trumbo",
    //         description:
    //           "THE ONLY ONE-VOLUME EDITION CONTAINING ALL 1,775 OF EMILY DICKINSON’S POEMSOnly eleven of Emily Dickinson’s poems were published prior to her death in 1886; the startling originality of her work doomed it to obscurity in her lifetime. Early posthumously published collections-some of them featuring liberally “edited” versions of the poems-did not fully and accurately represent Dickinson’s bold experiments in prosody, her tragic vision, and the range of her intellectual and emotional explorations. Not until the 1955 publication of The Complete Poems of Emily Dickinson, a three-volume critical edition compiled by Thomas H. Johnson, were readers able for the first time to assess, understand, and appreciate the whole of Dickinson’s extraordinary poetic genius.This book, a distillation of the three-volume Complete Poems, brings together the original texts of all 1,775 poems that Emily Dickinson wrote.",

    //         rating: 4.17,
    //         name: "Johnny Got His Gun",
    //         genre:
    //           "Fiction,Classics,War,Historical,Historical Fiction,Horror,Literature",
    //         image: "https://images.gr-assets.com/books/1386925458l/51606.jpg",
    //       },
    //       {
    //         author: "Anne Rice",
    //         description:
    //           "From #1 New York Times bestselling author Sylvia Day comes the provocative masterstroke of abandon and obsession that redefined the meaning of desire and became a global phenomenon...Gideon Cross came into my life like lightning in the darkness. He was beautiful and brilliant, jagged and white-hot. I was drawn to him as I'd never been to anything or anyone in my life. I craved his touch like a drug, even knowing it would weaken me. I was flawed and damaged, and he opened those cracks in me so easily.Gideon knew. He had demons of his own. And we would become the mirrors that reflected each others most private wounds and desires.The bonds of his love transformed me, even as I prayed that the torment of our pasts didn't tear us apart",

    //         rating: 4.11,
    //         name: "The Witching Hour",
    //         genre:
    //           "Horror,Fantasy,Fiction,Fantasy,Paranormal,Paranormal,Witches",
    //         image: "https://images.gr-assets.com/books/1327289387l/11901.jpg",
    //       },
    //       {
    //         author: "Sylvia Day",
    //         description:
    //           "A fresh, urban twist on the classic tale of star-crossed lovers.When Brittany Ellis walks into chemistry class on the first day of senior year, she has no clue that her carefully created 'perfect' life is about to unravel before her eyes. She's forced to be lab partners with Alex Fuentes, a gang member from the other side of town, and he is about to threaten everything she's worked so hard for: her flawless reputation, her relationship with her boyfriend, and the secret that her home life is anything but perfect. Alex is a bad boy and he knows it. So when he makes a bet with his friends to lure Brittany into his life, he thinks nothing of it. But soon Alex realizes Brittany is a real person with real problems, and suddenly the bet he made in arrogance turns into something much more.In a passionate story about looking beneath the surface, Simone Elkeles breaks through the stereotypes and barriers that threaten to keep Brittany and Alex apart.",

    //         rating: 4.19,
    //         name: "Bared to You",
    //         genre:
    //           "Romance,Adult Fiction,Erotica,Contemporary,Adult,Romance,Contemporary Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1433411511l/20448515.jpg",
    //       },
    //       {
    //         author: "Simone Elkeles",
    //         description:
    //           "Flirting with the Grave...Half-vampire Catherine Crawfield is going after the undead with a vengeance, hoping that one of these deadbeats is her father - the one responsible for ruining her mother's life. Then she's captured by Bones, a vampire bounty hunter, and is forced into an unholy partnership.In exchange for finding her father, Cat agrees to train with the sexy night stalker until her battle reflexes are as sharp as his fangs. She's amazed she doesn't end up as his dinner - are there actually good vampires? Pretty soon Bones will have her convinced that being half-dead doesn't have to be all bad. But before she can enjoy her newfound status as kick-ass demon hunter, Cat and Bones are pursued by a group of killers. Now Cat will have to choose a side . . . and Bones is turning out to be as tempting as any man with a heartbeat.",

    //         rating: 4.07,
    //         name: "Perfect Chemistry",
    //         genre:
    //           "Romance,Young Adult,Contemporary,Romance,Contemporary Romance",
    //         image: "https://images.gr-assets.com/books/1439792475l/4268157.jpg",
    //       },
    //       {
    //         author: "Jeaniene Frost",
    //         description:
    //           "The masterpiece that started The New York Times bestselling epic Sword of Truth.In the aftermath of the brutal murder of his father, a mysterious woman, Kahlan Amnell, appears in Richard Cypher's forest sanctuary seeking help . . . and more. His world, his very beliefs, are shattered when ancient debts come due with thundering violence. In a dark age it takes courage to live, and more than mere courage to challenge those who hold dominion, Richard and Kahlan must take up that challenge or become the next victims. Beyond awaits a bewitching land where even the best of their hearts could betray them. Yet, Richard fears nothing so much as what secrets his sword might reveal about his own soul. Falling in love would destroy them--for reasons Richard can't imagine and Kahlan dare not say.In their darkest hour, hunted relentlessly, tormented by treachery and loss, Kahlan calls upon Richard to reach beyond his sword--to invoke within himself something more noble. Neither knows that the rules of battle have just changed . . . or that their time has run out.This is the beginning. One book. One Rule. Witness the birth of a legend.",

    //         rating: 4.18,
    //         name: "Halfway to the Grave",
    //         genre:
    //           "Fantasy,Paranormal,Paranormal,Vampires,Fantasy,Urban Fantasy,Romance,Romance,Paranormal Romance,Fantasy",
    //         image: "https://images.gr-assets.com/books/1373855613l/1421990.jpg",
    //       },
    //       {
    //         author: "Stephenie Meyer",
    //         description:
    //           "Cry, the Beloved Country, the most famous and important novel in South Africa’s history, was an immediate worldwide bestseller in 1948. Alan Paton’s impassioned novel about a black man’s country under white man’s law is a work of searing beauty.Cry, the beloved country, for the unborn child that is the inheritor of our fear. Let him not love the earth too deeply. Let him not laugh too gladly when the water runs through his fingers, nor stand too silent when the setting sun makes red the veld with fire. Let him not be too moved when the birds of his land are singing, nor give too much of his heart to a mountain or valley. For fear will rob him of all if he gives too much.The eminent literary critic Lewis Gannett wrote, “We have had many novels from statesmen and reformers, almost all bad; many novels from poets, almost all thin. In Alan Paton’s Cry, the Beloved Country the statesman, the poet and the novelist meet in a unique harmony.” Cry, the Beloved Country is the deeply moving story of the Zulu pastor Stephen Kumalo and his son, Absalom, set against the background of a land and a people riven by racial injustice. Remarkable for its lyricism, unforgettable for character and incident, Cry, the Beloved Country is a classic work of love and hope, courage and endurance, born of the dignity of man.",

    //         rating: 3.84,
    //         name: "The Host",
    //         genre:
    //           "Science Fiction,Fiction,Young Adult,Science Fiction,Dystopia,Fantasy,Paranormal,Science Fiction,Aliens",
    //         image: "https://images.gr-assets.com/books/1318009171l/1656001.jpg",
    //       },
    //       {
    //         author: "Alan Paton",
    //         description:
    //           "A timeless novel of a straitlaced village's awakening to joy and sensuality - every page offers a description of chocolate to melt in the mouths of chocoholics, francophiles, armchair gourmets, cookbook readers, and lovers of passion everywhere.Illuminating Peter Mayle's South of France with a touch of Laura Esquivel's magic realism, Chocolat is a timeless novel of a straitlaced village's awakening to joy and sensuality. In tiny Lansquenet, where nothing much has changed in a hundred years, beautiful newcomer Vianne Rocher and her exquisite chocolate shop arrive and instantly begin to play havoc with Lenten vows. Each box of luscious bonbons comes with a free gift: Vianne's uncanny perception of its buyer's private discontents and a clever, caring cure for them. Is she a witch? Soon the parish no longer cares, as it abandons itself to temptation, happiness, and a dramatic face-off between Easter solemnity and the pagan gaiety of a chocolate festival. Chocolat's every page offers a description of chocolate to melt in the mouths of chocoholics, francophiles, armchair gourmets, cookbook readers, and lovers of passion everywhere. It's a must for anyone who craves an escapist read, and is a bewitching gift for any holiday.",

    //         rating: 3.88,
    //         name: "Cry, the Beloved Country",
    //         genre:
    //           "Fiction,Classics,Cultural,Africa,Historical,Historical Fiction,Southern Africa,South Africa,Literature",
    //         image: "https://images.gr-assets.com/books/1344182368l/6150.jpg",
    //       },
    //       {
    //         author: "Joanne Harris",
    //         description:
    //           "The Zombie War came unthinkably close to eradicating humanity. Max Brooks, driven by the urgency of preserving the acid-etched first-hand experiences of the survivors from those apocalyptic years, traveled across the United States of America and throughout the world, from decimated cities that once teemed with upwards of thirty million souls to the most remote and inhospitable areas of the planet. He recorded the testimony of men, women, and sometimes children who came face-to-face with the living, or at least the undead, hell of that dreadful time. World War Z is the result. Never before have we had access to a document that so powerfully conveys the depth of fear and horror, and also the ineradicable spirit of resistance, that gripped human society through the plague years.Ranging from the now infamous village of New Dachang in the United Federation of China, where the epidemiological trail began with the twelve-year-old Patient Zero, to the unnamed northern forests where untold numbers sought a terrible and temporary refuge in the cold, to the United States of Southern Africa, where the Redeker Plan provided hope for humanity at an unspeakable price, to the west-of-the-Rockies redoubt where the North American tide finally started to turn, this invaluable chronicle reflects the full scope and duration of the Zombie War.Most of all, the book captures with haunting immediacy the human dimension of this epochal event. Facing the often raw and vivid nature of these personal accounts requires a degree of courage on the part of the reader, but the effort is invaluable because, as Mr. Brooks says in his introduction, By excluding the human factor, aren't we risking the kind of personal detachment from history that may, heaven forbid, lead us one day to repeat it? And in the end, isn't the human factor the only true difference between us and the enemy we now refer to as 'the living dead'?Note: Some of the numerical and factual material contained in this edition was previously published under the auspices of the United Nations Postwar Commission.",

    //         rating: 3.95,
    //         name: "Chocolat",
    //         genre: "Fiction,Romance,Magical Realism,Cultural,France,Fantasy",
    //         image: "https://images.gr-assets.com/books/1388674628l/47401.jpg",
    //       },
    //       {
    //         author: "Max Brooks",
    //         description:
    //           "After the 1st wave, only darkness remains. After the 2nd, only the lucky escape. And after the 3rd, only the unlucky survive. After the 4th wave, only one rule applies: trust no one.Now, it's the dawn of the 5th wave, and on a lonely stretch of highway, Cassie runs from Them. The beings who only look human, who roam the countryside killing anyone they see. Who have scattered Earth's last survivors. To stay alone is to stay alive, Cassie believes, until she meets Evan Walker. Beguiling and mysterious, Evan Walker may be Cassie's only hope for rescuing her brother-or even saving herself. But Cassie must choose: between trust and despair, between defiance and surrender, between life and death. To give up or to get up.",

    //         rating: 4.01,
    //         name: "World War Z: An Oral History of the Zombie War",
    //         genre:
    //           "Horror,Fiction,Horror,Zombies,Science Fiction,Fantasy,Apocalyptic,Post Apocalyptic",
    //         image: "https://images.gr-assets.com/books/1528312647l/8908.jpg",
    //       },
    //       {
    //         author: "Rick Yancey",
    //         description:
    //           "My name is Chloe Saunders and my life will never be the same again.All I wanted was to make friends, meet boys, and keep on being ordinary. I don't even know what that means anymore. It all started on the day that I saw my first ghost - and the ghost saw me.Now there are ghosts everywhere and they won't leave me alone. To top it all off, I somehow got myself locked up in Lyle House, a special home for troubled teens. Yet the home isn't what it seems. Don't tell anyone, but I think there might be more to my housemates than meets the eye. The question is, whose side are they on? It's up to me to figure out the dangerous secrets behind Lyle House... before its skeletons come back to haunt me.",

    //         rating: 4.08,
    //         name: "The 5th Wave",
    //         genre: "Young Adult,Science Fiction,Science Fiction,Dystopia",
    //         image:
    //           "https://images.gr-assets.com/books/1359853842l/16101128.jpg",
    //       },
    //       {
    //         author: "Kelley Armstrong",
    //         description:
    //           "ARE YOU MY MOTHER? tells a very simple story for children who have just started to read. their younger brothers or sisters will also want to follow the baby bird's quest as he asks everyone and everything he meets, Are You My Mother?.Back in 1957, Theodor Geisel responded to an article in Life magazine that lamented the use of boring reading primers in schools. Using the pseudonym of Dr. Seuss (Seuss was Geisel's middle name) and only two hundred twenty-three words, Geisel created a replacement for those dull primers: The Cat in the Hat. The instant success of the book prompted Geisel and his wife to found Beginner Books, and Geisel wrote many popular books in this series, including Hop on Pop, Fox in Socks, and Green Eggs and Ham. Other favorite titles in this series are Go, Dog, Go! and Are You My Mother? by P. D. Eastman, A Fly Went By, by Mike McClintock, and Put Me in the Zoo, by Robert Lopshire. These affordable hardcover books combine large print, easy vocabulary, and large, bright illustrations in stories kids will want to read again and again. Grades 1 - Grades 2.",

    //         rating: 4.03,
    //         name: "The Summoning",
    //         genre:
    //           "Young Adult,Fantasy,Fantasy,Paranormal,Fantasy,Urban Fantasy",
    //         image: "https://images.gr-assets.com/books/1478986944l/2800905.jpg",
    //       },
    //       {
    //         author: "John Steinbeck",
    //         description:
    //           "'In one moment, every drop of blood in my body was brought to a stop... There, as if it had that moment sprung out of the earth, stood the figure of a solitary Woman, dressed from head to foot in white'The Woman in White famously opens with Walter Hartright's eerie encounter on a moonlit London road. Engaged as a drawing master to the beautiful Laura Fairlie, Walter becomes embroiled in the sinister intrigues of Sir Percival Glyde and his 'charming' friend Count Fosco, who has a taste for white mice, vanilla bonbons, and poison. Pursuing questions of identity and insanity along the paths and corridors of English country houses and the madhouse, The Woman in White is the first and most influential of the Victorian genre that combined Gothic horror with psychological realism.Matthew Sweet's introduction explores the phenomenon of Victorian 'sensation' fiction, and discusses Wilkie Collins's biographical and societal influences. Included in this edition are appendices on theatrical adaptations of the novel and its serialisation history.",

    //         rating: 4.03,
    //         name: "Cannery Row",
    //         genre: "Classics,Fiction,Literature,Historical,Historical Fiction",
    //         image: "https://images.gr-assets.com/books/1388188936l/4799.jpg",
    //       },
    //       {
    //         author: "Max Lucado",
    //         description:
    //           "The Polar Express is a treasured holiday tradition. This lavish gift set includes a CD audio recording read by Liam Neeson, a keepsake All Aboard ornament, and a note from author Chris Van Allsburg.Awarded the prestigious Caldecott Medal in 1986, The Polar Express has sold more than 7 million copies, become a classic holiday movie, and been translated into stage productions that take place across the United States during the holiday season.",

    //         rating: 4.45,
    //         name: "You Are Special (Wemmicksville, #1)",
    //         genre: "Childrens,Picture Books,Childrens,Christian",
    //         image: "https://images.gr-assets.com/books/1348346102l/56728.jpg",
    //       },
    //       {
    //         author: "Daniel Quinn",
    //         description:
    //           "Last year, Annabel was the girl who has everything — at least that's the part she played in the television commercial for Kopf's Department Store.This year, she's the girl who has nothing: no best friend because mean-but-exciting Sophie dropped her, no peace at home since her older sister became anorexic, and no one to sit with at lunch. Until she meets Owen Armstrong.Tall, dark, and music-obsessed, Owen is a reformed bad boy with a commitment to truth-telling. With Owen's help, maybe Annabel can face what happened the night she and Sophie stopped being friends.",

    //         rating: 3.98,
    //         name: "Ishmael: An Adventure of the Mind and Spirit",
    //         genre: "Fiction,Philosophy,Spirituality,Classics,Environment",
    //         image: "https://images.gr-assets.com/books/1388180479l/227265.jpg",
    //       },
    //       {
    //         author: "Sarah Dessen",
    //         description:
    //           "Mara Dyer believes life can't get any stranger than waking up in a hospital with no memory of how she got there.It can.She believes there must be more to the accident she can't remember that killed her friends and left her strangely unharmed. There is.She doesn't believe that after everything she's been through, she can fall in love. She's wrong.",

    //         rating: 4.06,
    //         name: "Just Listen",
    //         genre: "Young Adult,Romance,Contemporary,Fiction,Realistic Fiction",
    //         image: "https://images.gr-assets.com/books/1358270741l/51738.jpg",
    //       },
    //       {
    //         author: "Michelle Hodkin",
    //         description:
    //           "Sparkling with the witty dialogue between Beatrice and Benedicts, Much Ado About Nothing is one of Shakespeare's most enjoyable and theatrically successful comedies.This edition offers a newly edited text and an exceptionally helpful and critically aware introduction. Paying particular attention to analysis of the play's minor characters, Sheldon P Zitner discusses Shakespeare's transformation of his source material. He rethinks the attitudes to gender relations that underlie the comedy and determine its view of marriage.About the Series:  For over 100 years Oxford World's Classics has made available the broadest spectrum of literature from around the globe. Each affordable volume reflects Oxford's commitment to scholarship, providing the most accurate text plus a wealth of other valuable features, including expert introductions by leading authorities, voluminous notes to clarify the text, up-to-date bibliographies for further study, and much more.Allowing for the play's openness to reinterpretation by successive generations of readers and performers, Zitner provides a socially analytic stage history, advancing new views for the actor as much as for the critic.",

    //         rating: 4.08,
    //         name: "The Unbecoming of Mara Dyer",
    //         genre: "Young Adult,Fantasy,Paranormal,Fantasy,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1336655755l/11408650.jpg",
    //       },
    //       {
    //         author: "Sherrilyn Kenyon",
    //         description:
    //           "WHEN SILENCE IS ALL THAT'S LEFT, CAN THE TRUTH FINALLY BE HEARD?Nora Grey can't remember the past five months of her life. After the initial shock of waking up in a cemetery and being told that she has been missing for weeks - with no one knowing where she was or who she was with - she tried to get her life back on track. Go to school, hang out with her best friend, Vee, and dodge mom's creepy new boyfriend.But there is this voice in the back of her head, an idea that she can almost reach out and touch. Visions of angel wings and unearthly creatures that have nothing to do with the life she knows.And this unshakable feeling that a part of her is missing.Then Nora crosses paths with a sexy stranger, whom she feels a mesmerizing connection to. He seems to hold all the answers...and her heart. Every minute she spends with him grows more and more intense until she realizes she could be falling in love. Again.",

    //         rating: 4.59,
    //         name: "Acheron",
    //         genre:
    //           "Romance,Paranormal Romance,Fantasy,Paranormal,Romance,Fantasy,Paranormal,Vampires",
    //         image: "https://images.gr-assets.com/books/1437687512l/2299110.jpg",
    //       },
    //       {
    //         author: "Becca Fitzpatrick",
    //         description:
    //           "Connor, Risa, and Lev are running for their lives.The Second Civil War was fought over reproductive rights. The chilling resolution: Life is inviolable from the moment of conception until age thirteen. Between the ages of thirteen and eighteen, however, parents can have their child unwound, whereby all of the child's organs are transplanted into different donors, so life doesn't technically end. Connor is too difficult for his parents to control. Risa, a ward of the state, is not enough to be kept alive. And Lev is a tithe, a child conceived and raised to be unwound. Together, they may have a chance to escape and to survive.",

    //         rating: 4.14,
    //         name: "Silence",
    //         genre:
    //           "Young Adult,Paranormal,Angels,Fantasy,Fantasy,Paranormal,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1362408152l/10637766.jpg",
    //       },
    //       {
    //         author: "Neal Shusterman",
    //         description:
    //           "Tatiana de Rosnay offers us a brilliantly subtle, compelling portrait of France under occupation and reveals the taboos and silence that surround this painful episode.Paris, July 1942: Sarah, a ten year-old girl, is brutally arrested with her family by the French police in the Vel’ d’Hiv’ roundup, but not before she locks her younger brother in a cupboard in the family's apartment, thinking that she will be back within a few hours. Paris, May 2002: On Vel’ d’Hiv’s 60th anniversary, journalist Julia Jarmond is asked to write an article about this black day in France's past. Through her contemporary investigation, she stumbles onto a trail of long-hidden family secrets that connect her to Sarah. Julia finds herself compelled to retrace the girl's ordeal, from that terrible term in the Vel d'Hiv', to the camps, and beyond. As she probes into Sarah's past, she begins to question her own place in France, and to reevaluate her marriage and her life. Tatiana de Rosnay offers us a brilliantly subtle, compelling portrait of France under occupation and reveals the taboos and silence that surround this painful episode.",

    //         rating: 4.18,
    //         name: "Unwind",
    //         genre:
    //           "Young Adult,Science Fiction,Dystopia,Science Fiction,Fiction",
    //         image: "https://images.gr-assets.com/books/1297677706l/764347.jpg",
    //       },
    //       {
    //         author: "Tatiana de Rosnay",
    //         description:
    //           "The story of a mother, her son and daughter, and her daughter's suitor that brings to life human beings who cling to a dream world that can so easily be shattered into jagged pieces.",

    //         rating: 4.15,
    //         name: "Sarah's Key",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,World War II,Holocaust,Historical,War,World War II",
    //         image: "https://images.gr-assets.com/books/1438863728l/556602.jpg",
    //       },
    //       {
    //         author: "Tennessee Williams",
    //         description:
    //           "Sookie Stackhouse is a cocktail waitress in Bon Temps, Louisiana. She has only a few close friends, because not everyone appreciates Sookie’s gift: she can read minds. That’s not exactly every man’s idea of date bait – unless they’re undead; vampires and the like can be tough to read. And that’s just the kind of guy Sookie’s been looking for. Maybe that’s why, when she comes across a naked vampire, she doesn’t just drive on by. He hasn’t got a clue who he is, but Sookie has: Eric looks just as scary and sexy – and dead – as ever. But now he has amnesia, he’s sweet, vulnerable, and in need of Sookie’s help – because whoever took his memory now wants his life.",

    //         rating: 3.68,
    //         name: "The Glass Menagerie",
    //         genre:
    //           "Plays,Classics,Drama,Fiction,Plays,Theatre,Academic,School,Literature,Academic,Read For School,Young Adult,High School,Literature,American",
    //         image: "https://images.gr-assets.com/books/1391591003l/92517.jpg",
    //       },
    //       {
    //         author: "Charlaine Harris",
    //         description:
    //           "Lawrence's frank portrayal of an extramarital affair and the explicit sexual explorations of the central characters caused this controversial book, now considered a masterpiece, to be banned as pornography until 1960.",

    //         rating: 4.14,
    //         name: "Dead to the World",
    //         genre:
    //           "Fantasy,Paranormal,Vampires,Fantasy,Paranormal,Fantasy,Urban Fantasy,Romance,Fiction,Mystery",
    //         image: "https://images.gr-assets.com/books/1468561630l/140077.jpg",
    //       },
    //       {
    //         author: "D.H. Lawrence",
    //         description:
    //           "Emil Sinclair ist ein Junge, der in einem als Scheinwelt beschrieben bürgerlichen Elternhaus aufgewachsen ist. Dies ist die dramatische Geschichte seines Abstiegs - gesteuert durch sein frühreifen Schulkamerad Max Demian - in eine geheime und gefährliche Welt der Kleinkriminalität und Revolte gegen Konvention und seiner Erwachen zu Selbstheit.",

    //         rating: 3.5,
    //         name: "Lady Chatterley's Lover",
    //         genre: "Classics,Fiction,Romance,Literature",
    //         image: "https://images.gr-assets.com/books/1215571713l/32049.jpg",
    //       },
    //       {
    //         author: "Hermann Hesse",
    //         description:
    //           "There are alternate cover editions for this ISBN here and here.A long, hot summer...That's what Macy has to look forward to while her boyfriend, Jason, is away at Brain Camp. Days will be spent at a boring job in the library, evenings will be filled with vocabulary drills for the SATs, and spare time will be passed with her mother, the two of them sharing a silent grief at the traumatic loss of Macy's father.But sometimes, unexpected things can happen—things such as the catering job at Wish, with its fun-loving, chaotic crew. Or her sister's project of renovating the neglected beach house, awakening long-buried memories. Things such as meeting Wes, a boy with a past, a taste for Truth-telling, and an amazing artistic talent, the kind of boy who could turn any girl's world upside down. As Macy ventures out of her shell, she begins to question her sheltered life. Is it really always better to be safe than sorry?",

    //         rating: 4.11,
    //         name: "Demian. Die Geschichte von Emil Sinclairs Jugend",
    //         genre:
    //           "Fiction,Classics,Philosophy,Literature,European Literature,German Literature,Novels,Cultural,Germany,Literature,20th Century,Spirituality,Nobel Prize",
    //         image: "https://images.gr-assets.com/books/1421510580l/24861.jpg",
    //       },
    //       {
    //         author: "Jhumpa Lahiri",
    //         description:
    //           "The adventures continue for Laura Ingalls and her family as they leave their little house in the Big Woods of Wisconsin and set out for the big skies of the Kansas Territory. They travel for many days in their covered wagon until they find the best spot to build their house. Soon they are planting and plowing, hunting wild ducks and turkeys, and gathering grass for their cows. Just when they begin to feel settled, they are caught in the middle of a dangerous conflict.",

    //         rating: 4.13,
    //         name: "Interpreter of Maladies",
    //         genre: "Short Stories,Fiction,Cultural,India",
    //         image: "https://images.gr-assets.com/books/1442586143l/5439.jpg",
    //       },
    //       {
    //         author: "Arthur C. Clarke",
    //         description:
    //           "The Pulitzer Prize-winning epic of the Great Depression, a book that galvanized—and sometimes outraged—millions of readers.First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joads—driven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity. A portrait of the conflict between the powerful and the powerless, of one man’s fierce reaction to injustice, and of one woman’s stoical strength, the novel captures the horrors of the Great Depression and probes into the very nature of equality and justice in America. At once a naturalistic epic, captivity narrative, road novel, and transcendental gospel, Steinbeck’s powerful landmark novel is perhaps the most American of American Classics.",

    //         rating: 4.13,
    //         name: "2001: A Space Odyssey",
    //         genre:
    //           "Science Fiction,Fiction,Classics,Science Fiction Fantasy,Space,Fantasy,Novels,Audiobook,Literature,Speculative Fiction",
    //         image: "https://images.gr-assets.com/books/1432468943l/70535.jpg",
    //       },
    //       {
    //         author: "John Steinbeck",
    //         description:
    //           "In this breathtaking novel—rich in history and adventure—The New York Times bestselling author Diana Gabaldon continues the story of Claire Randall and Jamie Fraser that began with the now-classic novel Outlander and continued in Dragonfly in Amber and Voyager. Once again spanning continents and centuries, Diana Gabaldon has created a work of sheer passion and brilliance.... It began at an ancient Scottish stone circle. There, a doorway, open to a select few, leads into the past—or the grave. Dr. Claire Randall survived the extraordinary passage, not once but twice.Her first trip swept her into the arms of Jamie Fraser, an eighteenth-century Scot whose love for her became a legend—a tale of tragic passion that ended with her return to the present to bear his child. Her second journey, two decades later, brought them together again in the American colonies. But Claire had left someone behind in the twentieth century—their daughter, Brianna....Now Brianna has made a disturbing discovery that sends her to the circle of stones and a terrifying leap into the unknown. In search of her mother and the father she has never met, she is risking her own future to try to change history ... and to save their lives. But as Brianna plunges into an uncharted wilderness, a heartbreaking encounter may strand her forever in the past ... or root her in the place she should be, where her heart and soul belong....",

    //         rating: 3.94,
    //         name: "The Grapes of Wrath",
    //         genre: "Classics,Fiction,Historical,Historical Fiction,Literature",
    //         image:
    //           "https://images.gr-assets.com/books/1513108059l/18114322.jpg",
    //       },
    //       {
    //         author: "Diana Gabaldon",
    //         description:
    //           "Laura Ingalls and her family live deep in the Big Woods of Wisconsin. Their log cabin is surrounded by miles of trees, and their closest neighbors are bears, wolves, and panthers. Daily chores keep Laura and her sister Mary busy, but they still find time to go exploring with their dog, Jack.",

    //         rating: 4.34,
    //         name: "Drums of Autumn",
    //         genre:
    //           "Historical,Historical Fiction,Romance,Fantasy,Fiction,Science Fiction,Time Travel,Historical",
    //         image: "https://images.gr-assets.com/books/1500688941l/10988.jpg",
    //       },
    //       {
    //         author: "Ken Follett",
    //         description:
    //           "Sent to a boarding school in Ancelstierre as a young child, Sabriel has had little experience with the random power of Free Magic or the Dead who refuse to stay dead in the Old Kingdom. But during her final semester, her father, the Abhorsen, goes missing, and Sabriel knows she must enter the Old Kingdom to find him. With Sabriel, the first installment in the Abhorsen series, Garth Nix exploded onto the fantasy scene as a rising star, in a novel that takes readers to a world where the line between the living and the dead isn't always clear—and sometimes disappears altogether.",

    //         rating: 4.25,
    //         name: "World Without End",
    //         genre: "Historical,Historical Fiction,Fiction,Historical",
    //         image: "https://images.gr-assets.com/books/1509545511l/5064.jpg",
    //       },
    //       {
    //         author: "Garth Nix",
    //         description:
    //           "When Ruby woke up on her tenth birthday, something about her had changed. Something frightening enough to make her parents lock her in the garage and call the police. Something that got her sent to Thurmond, a brutal government “rehabilitation camp.” She might have survived the mysterious disease that had killed most of America’s children, but she and the others emerged with something far worse: frightening abilities they could not control.Now sixteen, Ruby is one of the dangerous ones. When the truth comes out, Ruby barely escapes Thurmond with her life. She is on the run, desperate to find the only safe haven left for kids like her—East River. She joins a group of kids who have escaped their own camp. Liam, their brave leader, is falling hard for Ruby. But no matter how much she aches for him, Ruby can’t risk getting close. Not after what happened to her parents. When they arrive at East River, nothing is as it seems, least of all its mysterious leader. But there are other forces at work, people who will stop at nothing to use Ruby in their fight against the government. Ruby will be faced with a terrible choice, one that may mean giving up her only chance at having a life worth living.",

    //         rating: 4.17,
    //         name: "Sabriel",
    //         genre: "Fantasy,Young Adult,Fiction,Fantasy,Magic",
    //         image: "https://images.gr-assets.com/books/1293655399l/518848.jpg",
    //       },
    //       {
    //         author: "Lionel Shriver",
    //         description:
    //           "This is the remarkable story of one endearing dog's search for his purpose over the course of several lives. More than just another charming dog story, this touches on the universal quest for an answer to life's most basic question: Why are we here? Surprised to find himself reborn as a rambunctious golden haired puppy after a tragically short life as a stray mutt, Bailey's search for his new life's meaning leads him into the loving arms of 8 year old Ethan. During their countless adventures Bailey joyously discovers how to be a good dog. But this life as a beloved family pet is not the end of Bailey's journey. Reborn as a puppy yet again, Bailey wonders, will he ever find his purpose? Heartwarming, insightful, and often laugh out loud funny, this book is not only the emotional and hilarious story of a dog's many lives, but also a dog's eye commentary on human relationships and the unbreakable bonds between man and man's best friend. This story teaches us that love never dies, that our true friends are always with us, and that every creature on earth is born with a purpose.",

    //         rating: 4.08,
    //         name: "We Need to Talk About Kevin",
    //         genre: "Fiction,Contemporary,Thriller",
    //         image: "https://images.gr-assets.com/books/1327865017l/80660.jpg",
    //       },
    //       {
    //         author: "W. Bruce Cameron",
    //         description:
    //           "At sixteen, Anne is grown up...almost. Her gray eyes shine like evening stars, but her red hair is still as peppery as her temper. In the years since she arrived at Green Gables as a freckle-faced orphan, she has earned the love of the people of Avonlea and a reputation for getting into scrapes. But when Anne begins her job as the new schoolteacher, the real test of her character begins. Along with teaching the three Rs, she is learning how complicated life can be when she meddles in someone else's romance, finds two new orphans at Green Gables, and wonders about the strange behaviour of the very handsome Gilbert Blythe. As Anne enters womanhood, her adventures touch the heart and the funny bone.",

    //         rating: 4.35,
    //         name: "A Dog's Purpose",
    //         genre: "Fiction,Animals,Animals,Dogs,Contemporary",
    //         image: "https://images.gr-assets.com/books/1441219933l/7723542.jpg",
    //       },
    //       {
    //         author: "L.M. Montgomery",
    //         description:
    //           "An airborne Boeing 747 is headed to London when, without any warning, passengers mysteriously disappear from their seats. Terror and chaos slowly spread not only through the plane but also worldwide as unusual events continue to unfold. For those who have been left behind, the apocalypse has just begun...",

    //         rating: 4.22,
    //         name: "Anne of Avonlea",
    //         genre:
    //           "Classics,Fiction,Young Adult,Historical,Historical Fiction,Childrens",
    //         image: "https://images.gr-assets.com/books/1305545757l/77390.jpg",
    //       },
    //       {
    //         author: "Ellen Raskin",
    //         description:
    //           "Hillenbrand brilliantly re-creates a universal underdog story, one that proves life is a horse race.Seabiscuit was one of the most electrifying and popular attractions in sports history and the single biggest newsmaker in the world in 1938, receiving more coverage than FDR, Hitler, or Mussolini. But his success was a surprise to the racing establishment, which had written off the crooked-legged racehorse with the sad tail. Three men changed Seabiscuit’s fortunes:Charles Howard was a onetime bicycle repairman who introduced the automobile to the western United States and became an overnight millionaire. When he needed a trainer for his new racehorses, he hired Tom Smith, a mysterious mustang breaker from the Colorado plains. Smith urged Howard to buy Seabiscuit for a bargain-basement price, then hired as his jockey Red Pollard, a failed boxer who was blind in one eye, half-crippled, and prone to quoting passages from Ralph Waldo Emerson. Over four years, these unlikely partners survived a phenomenal run of bad fortune, conspiracy, and severe injury to transform Seabiscuit from a neurotic, pathologically indolent also-ran into an American sports icon.Author Laura Hillenbrand brilliantly re-creates a universal underdog story, one that proves life is a horse race.",

    //         rating: 4.03,
    //         name: "The Westing Game",
    //         genre:
    //           "Mystery,Young Adult,Fiction,Childrens,Childrens,Middle Grade,Classics",
    //         image: "https://images.gr-assets.com/books/1356850909l/902.jpg",
    //       },
    //       {
    //         author: "Laura Hillenbrand",
    //         description:
    //           "On a winter night in 1964, Dr. David Henry is forced by a blizzard to deliver his own twins. His son, born first, is perfectly healthy. Yet when his daughter is born, he sees immediately that she has Down's Syndrome. Rationalizing it as a need to protect Norah, his wife, he makes a split-second decision that will alter all of their lives forever. He asks his nurse to take the baby away to an institution and never to reveal the secret. But Caroline, the nurse, cannot leave the infant. Instead, she disappears into another city to raise the child herself. So begins this story that unfolds over a quarter of a century - in which these two families, ignorant of each other, are yet bound by the fateful decision made that long-ago winter night. Norah Henry, who knows only that her daughter died at birth, remains inconsolable; her grief weighs heavily on their marriage. And Paul, their son, raises himself as best he can, in a house grown cold with mourning. Meanwhile, Phoebe, the lost daughter, grows from a sunny child to a vibrant young woman whose mother loves her as fiercely as if she were her own.",

    //         rating: 4.21,
    //         name: "Seabiscuit: An American Legend",
    //         genre:
    //           "Nonfiction,History,Biography,Sports and Games,Sports,Animals",
    //         image: "https://images.gr-assets.com/books/1171644213l/110737.jpg",
    //       },
    //       {
    //         author: "Kim Edwards",
    //         description:
    //           "On the world called Hyperion, beyond the law of the Hegemony of Man, there waits the creature called the Shrike. There are those who worship it. There are those who fear it. And there are those who have vowed to destroy it. In the Valley of the Time Tombs, where huge, brooding structures move backward through time, the Shrike waits for them all. On the eve of Armageddon, with the entire galaxy at war, seven pilgrims set forth on a final voyage to Hyperion seeking the answers to the unsolved riddles of their lives. Each carries a desperate hope—and a terrible secret. And one may hold the fate of humanity in his hands. A stunning tour de force filled with transcendent awe and wonder, Hyperion is a masterwork of science fiction that resonates with excitement and invention, the first volume in a remarkable new science fiction epic by the multiple-award-winning author of The Hollow ManFrom the Paperback edition.",

    //         rating: 3.65,
    //         name: "The Memory Keeper's Daughter",
    //         genre: "Fiction,Contemporary,Adult Fiction,Adult",
    //         image: "https://images.gr-assets.com/books/1406611602l/10441.jpg",
    //       },
    //       {
    //         author: "Dan Simmons",
    //         description:
    //           "Choose: A quick death…Or slow poison...About to be executed for murder, Yelena is offered an extraordinary reprieve. She'll eat the best meals, have rooms in the palace—and risk assassination by anyone trying to kill the Commander of Ixia.And so Yelena chooses to become a food taster. But the chief of security, leaving nothing to chance, deliberately feeds her Butterfly's Dust—and only by appearing for her daily antidote will she delay an agonizing death from the poison.As Yelena tries to escape her new dilemma, disasters keep mounting. Rebels plot to seize Ixia and Yelena develops magical powers she can't control. Her life is threatened again and choices must be made. But this time the outcomes aren't so clear...",

    //         rating: 4.22,
    //         name: "Hyperion",
    //         genre: "Science Fiction,Fiction,Fantasy",
    //         image: "https://images.gr-assets.com/books/1405546838l/77566.jpg",
    //       },
    //       {
    //         author: "Maria V. Snyder",
    //         description:
    //           "In his blistering new novel, Cormac McCarthy returns to the Texas-Mexico border, setting of his famed Border Trilogy. The time is our own, when rustlers have given way to drug-runners and small towns have become free-fire zones. One day, Llewellyn Moss finds a pickup truck surrounded by a bodyguard of dead men. A load of heroin and two million dollars in cash are still in the back. When Moss takes the money, he sets off a chain reaction of catastrophic violence that not even the law–in the person of aging, disillusioned Sheriff Bell–can contain.As Moss tries to evade his pursuers–in particular a mysterious mastermind who flips coins for human lives–McCarthy simultaneously strips down the American crime novel and broadens its concerns to encompass themes as ancient as the Bible and as bloodily contemporary as this morning’s headlines. No Country for Old Men is a triumph.",

    //         rating: 4.15,
    //         name: "Poison Study",
    //         genre: "Fantasy,Young Adult,Romance,Fantasy,Magic,Fiction",
    //         image: "https://images.gr-assets.com/books/1388519019l/60510.jpg",
    //       },
    //       {
    //         author: "Cormac McCarthy",
    //         description:
    //           "On a brisk autumn day, a twelve-year-old boy stands on the shores of the gray Atlantic, near a silent amusement park and a fading ocean resort called the Alhambra. The past has driven Jack Sawyer here: his father is gone, his mother is dying, and the world no longer makes sense. But for Jack everything is about to change. For he has been chosen to make a journey back across America--and into another realm.One of the most influential and heralded works of fantasy ever written, The Talisman is an extraordinary novel of loyalty, awakening, terror, and mystery. Jack Sawyer, on a desperate quest to save his mother's life, must search for a prize across an epic landscape of innocents and monsters, of incredible dangers and even more incredible truths. The prize is essential, but the journey means even more. Let the quest begin. . . .",

    //         rating: 4.13,
    //         name: "No Country for Old Men",
    //         genre: "Fiction,Thriller,Mystery,Crime,Westerns,Mystery,Literature",
    //         image: "https://images.gr-assets.com/books/1443231179l/12497.jpg",
    //       },
    //       {
    //         author: "Rhonda Byrne",
    //         description:
    //           "Librarian's note: An alternate cover edition can be found hereIn 1976, a uniquely seductive world of vampires was unveiled in the now-classic Interview with the Vampire . . . in 1985, a wild and voluptous voice spoke to us, telling the story of The Vampire Lestat.  In The Queen of the Damned, Anne Rice continues her extraordinary Vampire Chronicles in a feat of mesmeric storytelling, a chillingly hypnotic entertainment in which the oldest and most powerful forces of the night are unleashed on an unsuspecting world.Three brilliantly colored narrative threads intertwine as the story unfolds:- The rock star known as Vampire Lestat, worshipped by millions of spellbound fans, prepares for a concert in San Francisco.  Among the audience--pilgrims in a blind swoon of adoration--are hundreds of vampires, creatures who see Lestat as a greedy fiend risking the secret prosperity of all his kind just to be loved and seen by mortals, fiends themselves who hate Lestat's power and who are determined to destroy him . . . - The sleep of certain men and women--vampires and mortals scattered around the world--is haunted by a vivid, mysterious dream: of twins with fiery red hair and piercing green eyes who suffer an unspeakable tragedy.  It is a dream that slowly, tauntingly reveals its meaning to the dreamers as they make their way toward each other--some to be destroyed on the journey, some to face an even more terrifying fate at journey's end . . . - Akasha--Queen of the Damned, mother of all vampires, rises after a 6,000 year sleep and puts into motion a heinous plan to save mankind from itself and make all myths of the world real by elevating herself and her chosen son/lover to the level of the gods: I am the fulfillment and I shall from this moment be the cause . . . These narrative threads wind sinuously across a vast, richly detailed tapestry of the violent, sensual world of vampirism, taking us back 6,000 years to its beginnings.  As the stories of the first brood of blood drinkers are revealed, we are swept across the ages, from Egypt to South America to the Himalayas to all the shrouded corners of the globe where vampires have left their mark. Vampires are created--mortals succumbing to the sensation of being enptied, of being devoured, of being nothing. Vampires are destroyed.  Dark rituals are performed--the rituals of ancient creatures prowling the modern world.  And, finally, we are brought to a moment in the twentieth century when, in an astonishing climax, the fate of the living dead--and perhaps of the living, all the living--will be decided.From the Hardcover edition.",

    //         rating: 3.65,
    //         name: "The Secret",
    //         genre: "Self Help,Nonfiction,Spirituality,Psychology",
    //         image: "https://images.gr-assets.com/books/1482865039l/52529.jpg",
    //       },
    //       {
    //         author: "Anne Rice",
    //         description:
    //           "In the blink of an eye, everyone disappears. Gone. Except for the young.There are teens, but not one single adult. Just as suddenly, there are no phones, no internet, no television. No way to get help. And no way to figure out what's happened.Hunger threatens. Bullies rule. A sinister creature lurks. Animals are mutating. And the teens themselves are changing, developing new talents—unimaginable, dangerous, deadly powers—that grow stronger by the day. It's a terrifying new world. Sides are being chosen, a fight is shaping up. Townies against rich kids. Bullies against the weak. Powerful against powerless. And time is running out: On your 15th birthday, you disappear just like everyone else...",

    //         rating: 3.88,
    //         name: "The Queen of the Damned",
    //         genre:
    //           "Horror,Fantasy,Paranormal,Vampires,Fiction,Fantasy,Paranormal",
    //         image: "https://images.gr-assets.com/books/1327871992l/43758.jpg",
    //       },
    //       {
    //         author: "Michael  Grant",
    //         description:
    //           "Robert Neville is the last living man on Earth...but he is not alone. Every other man, woman, and child on Earth has become a vampire, and they are all hungry for Neville's blood.By day, he is the hunter, stalking the sleeping undead through the abandoned ruins of civilization. By night, he barricades himself in his home and prays for dawn.How long can one man survive in a world of vampires?I am legend --Buried talents --The near departed --Prey --Witch war --Dance of the dead --Dress of white silk --Mad house --The funeral --From shadowed places --Person to person.",

    //         rating: 3.86,
    //         name: "Gone",
    //         genre:
    //           "Young Adult,Science Fiction,Dystopia,Science Fiction,Fantasy,Fiction,Fantasy,Paranormal,Adventure,Romance,Fantasy,Supernatural,Young Adult,Teen",
    //         image: "https://images.gr-assets.com/books/1357796831l/2536134.jpg",
    //       },
    //       {
    //         author: "Richard Matheson",
    //         description:
    //           "Jill and Eustace must rescue the Prince from the evil Witch.NARNIA...where owls are wise, where some of the giants like to snack on humans, where a prince is put under an evil spell...and where the adventure begins.Eustace and Jill escape from the bullies at school through a strange door in the wall, which, for once, is unlocked. It leads to the open moor...or does it? Once again Aslan has a task for the children, and Narnia needs them. Through dangers untold and caverns deep and dark, they pursue the quest that brings them face to face with the evil Witch. She must be defeated if Prince Rillian is to be saved.",

    //         rating: 3.99,
    //         name: "I Am Legend and Other Stories",
    //         genre:
    //           "Horror,Fiction,Science Fiction,Paranormal,Vampires,Fantasy,Short Stories",
    //         image: "https://images.gr-assets.com/books/1317791583l/547094.jpg",
    //       },
    //       {
    //         author: "A.S. Byatt",
    //         description:
    //           "Right from the start, Bigger Thomas had been headed for jail. It could have been for assault or petty larceny; by chance, it was for murder and rape. Native Son tells the story of this young black man caught in a downward spiral after he kills a young white woman in a brief moment of panic.Set in Chicago in the 1930s, Wright's powerful novel is an unsparing reflection on the poverty and feelings of hopelessness experienced by people in inner cities across the country and of what it means to be black in America.",

    //         rating: 3.88,
    //         name: "Possession",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Romance,Classics,Mystery",
    //         image: "https://images.gr-assets.com/books/1391124124l/41219.jpg",
    //       },
    //       {
    //         author: "Richard Wright",
    //         description:
    //           "My name is MacKayla, Mac for short. I'm a sidhe-seer, one who sees the Fae, a fact I accepted only recently and very reluctantly.My philosophy is pretty simple - any day nobody's trying to kill me is a good day in my book. I haven't had many good days lately. Not since the walls between Man and Fae came down. But then, there's not a sidhe-seer alive who's had a good day since then.When MacKayla's sister was murdered, she left a single clue to her death, a cryptic message on Mac's cell phone. Journeying to Ireland in search of answers, Mac is soon faced with an even greater challenge: staying alive long enough to master a power she had no idea she possessed - a gift that allows her to see beyond the world of man, into the dangerous realm of the Fae.As Mac delves deeper into the mystery of her sister's death, her every move is shadowed by the dark, mysterious Jericho...while at the same time, the ruthless V'lane - an alpha Fae who makes sex an addiction for human women - closes in on her. As the boundary between worlds begins to crumble, Mac's true mission becomes clear: to find the elusive Sinsar Dubh before someone else claims the all-powerful Dark Book - because whoever gets to it first holds nothing less than complete control both worlds in their hands.",

    //         rating: 3.97,
    //         name: "Native Son",
    //         genre:
    //           "Fiction,Classics,Cultural,African American,Historical,Historical Fiction,Literature",
    //         image: "https://images.gr-assets.com/books/1440820866l/15622.jpg",
    //       },
    //       {
    //         author: "Karen Marie Moning",
    //         description:
    //           "Twenty-Five Hundred years ago, Sun Tzu wrote this classic book of military strategy based on Chinese warfare and military thought. Since that time, all levels of military have used the teaching on Sun Tzu to warfare and cilivzation have adapted these teachings for use in politics, business and everyday life. The Art of War is a book which should be used to gain advantage of opponents in the boardroom and battlefield alike.",

    //         rating: 4.12,
    //         name: "Darkfever",
    //         genre:
    //           "Fantasy,Fantasy,Urban Fantasy,Fantasy,Paranormal,Romance,Romance,Paranormal Romance,Fairies,Fae",
    //         image: "https://images.gr-assets.com/books/1392579949l/112750.jpg",
    //       },
    //       {
    //         author: "Nicole Krauss",
    //         description:
    //           "An ancient secret brotherhood.A devastating new weapon of destruction.An unthinkable target... When world-renowned Harvard symbologist Robert Langdon is summoned to a Swiss research facility to analyze a mysterious symbol -- seared into the chest of a murdered physicist -- he discovers evidence of the unimaginable: the resurgence of an ancient secret brotherhood known as the Illuminati... the most powerful underground organization ever to walk the earth. The Illuminati has surfaced from the shadows to carry out the final phase of its legendary vendetta against its most hated enemy... the Catholic Church. Langdon's worst fears are confirmed on the eve of the Vatican's holy conclave, when a messenger of the Illuminati announces he has hidden an unstoppable time bomb at the very heart of Vatican City. With the countdown under way, Langdon jets to Rome to join forces with Vittoria Vetra, a beautiful and mysterious Italian scientist, to assist the Vatican in a desperate bid for survival. Embarking on a frantic hunt through sealed crypts, dangerous catacombs, deserted cathedrals, and even to the heart of the most secretive vault on earth, Langdon and Vetra follow a 400-year old trail of ancient symbols that snakes across Rome toward the long-forgotten Illuminati lair... a secret location that contains the only hope for Vatican salvation. An explosive international thriller, Angels & Demons careens from enlightening epiphanies to dark truths as the battle between science and religion turns to war.",

    //         rating: 3.92,
    //         name: "The History of Love",
    //         genre: "Fiction,Historical,Historical Fiction,Romance,Novels",
    //         image: "https://images.gr-assets.com/books/1327911009l/3867.jpg",
    //       },
    //       {
    //         author: "Dan Brown",
    //         description:
    //           "It's been three years since the devastating accident . . . three years since Mia walked out of Adam's life forever.Now living on opposite coasts, Mia is Juilliard's rising star and Adam is LA tabloid fodder, thanks to his new rock star status and celebrity girlfriend. When Adam gets stuck in New York by himself, chance brings the couple together again, for one last night. As they explore the city that has become Mia's home, Adam and Mia revisit the past and open their hearts to the future - and each other.Told from Adam's point of view in the spare, lyrical prose that defined If I Stay, Where She Went explores the devastation of grief, the promise of new hope, and the flame of rekindled romance.",

    //         rating: 3.87,
    //         name: "Angels & Demons",
    //         genre: "Fiction,Mystery,Thriller",
    //         image: "https://images.gr-assets.com/books/1527091700l/960.jpg",
    //       },
    //       {
    //         author: "Gayle Forman",
    //         description:
    //           "Hamlet told from the worm's-eye view of two minor characters, bewildered Rosencrantz and Guildenstern. Echoes of Waiting for Godot resound, reality and illusion mix, and where fate leads heroes to a tragic but inevitable end.",

    //         rating: 4.04,
    //         name: "Where She Went",
    //         genre: "Young Adult,Romance,Contemporary,Fiction,Realistic Fiction",
    //         image: "https://images.gr-assets.com/books/1347810457l/8492825.jpg",
    //       },
    //       {
    //         author: "Scott Westerfeld",
    //         description:
    //           "The enthralling, often surprising story of John Adams, one of the most important and fascinating Americans who ever lived.In this powerful, epic biography, David McCullough unfolds the adventurous life-journey of John Adams, the brilliant, fiercely independent, often irascible, always honest Yankee patriot -- the colossus of independence, as Thomas Jefferson called him -- who spared nothing in his zeal for the American Revolution; who rose to become the second President of the United States and saved the country from blundering into an unnecessary war; who was learned beyond all but a few and regarded by some as out of his senses; and whose marriage to the wise and valiant Abigail Adams is one of the moving love stories in American history. Like his masterly, Pulitzer Prize-winning biography Truman, David McCullough's John Adams has the sweep and vitality of a great novel. It is both a riveting portrait of an abundantly human man and a vivid evocation of his time, much of it drawn from an outstanding collection of Adams family letters and diaries. In particular, the more than one thousand surviving letters between John and Abigail Adams, nearly half of which have never been published, provide extraordinary access to their private lives and make it possible to know John Adams as no other major American of his founding era. As he has with stunning effect in his previous books, McCullough tells the story from within -- from the point of view of the amazing eighteenth century and of those who, caught up in events, had no sure way of knowing how things would turn out. George Washington, Benjamin Franklin, John Jay, the British spy Edward Bancroft, Madame Lafayette and Jefferson's Paris interest Maria Cosway, Alexander Hamilton, James Madison, the scandalmonger James Callender, Sally Hemings, John Marshall, Talleyrand, and Aaron Burr all figure in this panoramic chronicle, as does, importantly, John Quincy Adams, the adored son whom Adams would live to see become President. Crucial to the story, as it was to history, is the relationship between Adams and Jefferson, born opposites -- one a Massachusetts farmer's son, the other a Virginia aristocrat and slaveholder, one short and stout, the other tall and spare. Adams embraced conflict; Jefferson avoided it. Adams had great humor; Jefferson, very little. But they were alike in their devotion to their country. At first they were ardent co-revolutionaries, then fellow diplomats and close friends. With the advent of the two political parties, they became archrivals, even enemies, in the intense struggle for the presidency in 1800, perhaps the most vicious election in history. Then, amazingly, they became friends again, and ultimately, incredibly, they died on the same day -- their day of days -- July 4, in the year 1826. Much about John Adams's life will come as a surprise to many readers. His courageous voyage on the frigate Boston in the winter of 1778 and his later trek over the Pyrenees are exploits that few would have dared and that few readers will ever forget. It is a life encompassing a huge arc -- Adams lived longer than any president. The story ranges from the Boston Massacre to Philadelphia in 1776 to the Versailles of Louis XVI, from Spain to Amsterdam, from the Court of St. James's, where Adams was the first American to stand before King George III as a representative of the new nation, to the raw, half-finished Capital by the Potomac, where Adams was the first President to occupy the White House. This is history on a grand scale -- a book about politics and war and social issues, but also about human nature, love, religious faith, virtue, ambition, friendship and betrayal, and the far-reaching consequences of noble ideas. Above all, John Adams is an enthralling, often surprising story of one of the most important and fascinating Americans who ever lived.",

    //         rating: 3.85,
    //         name: "Pretties",
    //         genre: "Young Adult,Science Fiction,Dystopia,Science Fiction",
    //         image: "https://images.gr-assets.com/books/1388314207l/24768.jpg",
    //       },
    //       {
    //         author: "David McCullough",
    //         description:
    //           "...what man wins more happiness than just its shape and the ruin when that shape collapses?Sophocles' Oedipus Rex has never been surpassed for the raw and terrible power with which its hero struggles to answer the eternal question, Who am I? The play, a story of a king who acting entirely in ignorance kills his father and marries his mother, unfolds with shattering power; we are helplessly carried along with Oedipus towards the final, horrific truth. To make Oedipus more accessible for the modern reader, our Prestwick House Literary Touchstone Classics includes a glossary of the more difficult words, as well as convenient sidebar notes to enlighten the reader on aspects that may be confusing or overlooked. We hope that the reader may, through this edition, more fully enjoy the beauty of the verse, the wisdom of the insights, and the impact of the drama.",

    //         rating: 4.05,
    //         name: "John Adams",
    //         genre:
    //           "History,Biography,Nonfiction,North American Hi...,American History,Politics,Presidents",
    //         image: "https://images.gr-assets.com/books/1478144278l/2203.jpg",
    //       },
    //       {
    //         author: "Andre Dubus III",
    //         description:
    //           "Foucault's Pendulum is divided into ten segments represented by the ten Sefiroth. The novel is full of esoteric references to the Kabbalah. The title of the book refers to an actual pendulum designed by the French physicist Léon Foucault to demonstrate the rotation of the earth, which has symbolic significance within the novel.Bored with their work, and after reading too many manuscripts about occult conspiracy theories, three vanity publisher employees (Belbo, Diotallevi and Casaubon) invent their own conspiracy for fun. They call this satirical intellectual game The Plan, a hoax that connects the medieval Knights Templar with other occult groups from ancient to modern times. This produces a map indicating the geographical point from which all the powers of the earth can be controlled—a point located in Paris, France, at Foucault’s Pendulum. But in a fateful turn the joke becomes all too real.The three become increasingly obsessed with The Plan, and sometimes forget that it's just a game. Worse still, other conspiracy theorists learn about The Plan, and take it seriously. Belbo finds himself the target of a real secret society that believes he possesses the key to the lost treasure of the Knights Templar.Orchestrating these and other diverse characters into his multilayered semiotic adventure, Eco has created a superb cerebral entertainment.",

    //         rating: 3.84,
    //         name: "House of Sand and Fog",
    //         genre:
    //           "Fiction,Contemporary,Literary Fiction,Adult Fiction,Literature,Novels,Book Club,Adult,Drama,Abandoned",
    //         image: "https://images.gr-assets.com/books/1348794554l/7944648.jpg",
    //       },
    //       {
    //         author: "Patrick Ness",
    //         description:
    //           "In the four most bloody and courageous days of our nation's history, two armies fought for two dreams. One dreamed of freedom, the other of a way of life. Far more than rifles and bullets were carried into battle. There were memories. There were promises. There was love. And far more than men fell on those Pennsylvania fields. Shattered futures, forgotten innocence, and crippled beauty were also the casualties of war. The Killer Angels is unique, sweeping, unforgettable—a dramatic re-creation of the battleground for America's destiny.",

    //         rating: 3.97,
    //         name: "The Knife of Never Letting Go",
    //         genre:
    //           "Young Adult,Science Fiction,Dystopia,Science Fiction,Fantasy",
    //         image: "https://images.gr-assets.com/books/1277071696l/2118745.jpg",
    //       },
    //       {
    //         author: "Michael Shaara",
    //         description:
    //           "It began with Eragon... It ends with Inheritance.Not so very long ago, Eragon — Shadeslayer, Dragon Rider — was nothing more than a poor farm boy, and his dragon, Saphira, only a blue stone in the forest. Now the fate of an entire civilization rests on their shoulders.Long months of training and battle have brought victories and hope, but they have also brought heartbreaking loss. And still, the real battle lies ahead: they must confront Galbatorix. When they do, they will have to be strong enough to defeat him. And if they cannot, no one can. There will be no second chance.The Rider and his dragon have come further than anyone dared to hope. But can they topple the evil king and restore justice to Alagaësia? And if so, at what cost?This is the spellbinding conclusion to Christopher Paolini's worldwide bestselling Inheritance cycle.",

    //         rating: 4.31,
    //         name: "The Killer Angels",
    //         genre:
    //           "Historical,Historical Fiction,Fiction,Military History,Civil War,War,Historical",
    //         image: "https://images.gr-assets.com/books/1355371689l/682804.jpg",
    //       },
    //       {
    //         author: "Christopher Paolini",
    //         description:
    //           "So…you’d think after banishing an immortal being and a fallen High Priestess, saving Stark’s life, biting Heath, getting a headache from Erik, and almost dying, Zoey Redbird would catch a break. Sadly, a break is not in the House of Night school forecast for the High Priestess in training and her gang.Juggling three guys is anything but a stress reliever, especially when one of them is a sexy Warrior who is so into protecting Zoey that he can sense her emotions. Speaking of stress, the dark force lurking in the tunnels under the Tulsa Depot is spreading, and Zoey is beginning to believe Stevie Rae could be responsible for a lot more than a group of misfit red fledglings. Aphrodite’s visions warn Zoey to stay away from Kalona and his dark allure, but they also show that it is Zoey who has the power to stop the evil immortal.Soon it becomes obvious that Zoey has no choice: if she doesn’t go to Kalona he will exact a fiery vengeance on those closest to her. Will Zoey have the courage to chance losing her life, her heart, and her soul?",

    //         rating: 4.09,
    //         name: "Inheritance",
    //         genre: "Young Adult,Fantasy,Dragons,Fiction",
    //         image: "https://images.gr-assets.com/books/1390886502l/7664041.jpg",
    //       },
    //       {
    //         author: "Benjamin Alire Sáenz",
    //         description:
    //           "Margaret Atwood takes the art of storytelling to new heights in a dazzling novel that unfolds layer by astonishing layer and concludes in a brilliant and wonderfully satisfying twist. Told in a style that magnificently captures the colloquialisms and clichés of the 1930s and 1940s, The Blind Assassin is a richly layered and uniquely rewarding experience.It opens with these simple, resonant words: Ten days after the war ended, my sister drove a car off the bridge. They are spoken by Iris, whose terse account of her sister Laura's death in 1945 is followed by an inquest report proclaiming the death accidental. But just as the reader expects to settle into Laura's story, Atwood introduces a novel-within-a- novel. Entitled The Blind Assassin, it is a science fiction story told by two unnamed lovers who meet in dingy backstreet rooms. When we return to Iris, it is through a 1947 newspaper article announcing the discovery of a sailboat carrying the dead body of her husband, a distinguished industrialist.For the past twenty-five years, Margaret Atwood has written works of striking originality and imagination. In The Blind Assassin, she stretches the limits of her accomplishments as never before, creating a novel that is entertaining and profoundly serious. The Blind Assassin proves once again that Atwood is one of the most talented, daring, and exciting writers of our time. Like The Handmaid's Tale, it is destined to become a classic.",

    //         rating: 4.35,
    //         name: "Aristotle and Dante Discover the Secrets of the Universe",
    //         genre: "Young Adult,Lgbt,Contemporary,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1328320260l/12000020.jpg",
    //       },
    //       {
    //         author: "Margaret Atwood",
    //         description:
    //           "The Pevensie siblings are back to help a prince denied his rightful throne as he gathers an army in a desperate attempt to rid his land of a false king. But in the end, it is a battle of honor between two men alone that will decide the fate of an entire world.",

    //         rating: 3.95,
    //         name: "The Blind Assassin",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Mystery,Cultural,Canada",
    //         image: "https://images.gr-assets.com/books/1451445426l/78433.jpg",
    //       },
    //       {
    //         author: "C.S. Lewis",
    //         description:
    //           "Pestered by her close New Jersey family, Stephanie Plum offers to catch high-school crush Joe Morelli, cop turned bail jumper, for her cousin Vinnie's company. She questions working girls to find the missing girlfriend of vicious prizefighter Benito Ramirez while Joe secretly watches her back. Ranger mentors her and supplies vehicles when hers explode.",

    //         rating: 3.97,
    //         name: "Prince Caspian",
    //         genre: "Fantasy,Classics,Fiction,Young Adult,Childrens",
    //         image: "https://images.gr-assets.com/books/1308814880l/121749.jpg",
    //       },
    //       {
    //         author: "Janet Evanovich",
    //         description:
    //           "Ketterdam: a bustling hub of international trade where anything can be had for the right price–and no one knows that better than criminal prodigy Kaz Brekker. Kaz is offered a chance at a deadly heist that could make him rich beyond his wildest dreams. But he can’t pull it off alone…A convict with a thirst for revenge.A sharpshooter who can’t walk away from a wager.A runaway with a privileged past.A spy known as the Wraith.A Heartrender using her magic to survive the slums.A thief with a gift for unlikely escapes.Six dangerous outcasts. One impossible heist. Kaz’s crew is the only thing that might stand between the world and destruction—if they don’t kill each other first.",

    //         rating: 4.03,
    //         name: "One for the Money",
    //         genre: "Mystery,Fiction,Womens Fiction,Chick Lit,Humor,Romance",
    //         image: "https://images.gr-assets.com/books/1316730230l/6853.jpg",
    //       },
    //       {
    //         author: "Howard Zinn",
    //         description:
    //           "The ruthless and brilliant brother Vishous possesses a destructive curse and a frightening ability to see the future. As a member of the Brotherhood, he has no interest in love or emotion, only the battle with the Lessening Society. But when a mortal injury puts him in the care of a human surgeon, Dr. Jane Whitcomb compels him to reveal his inner pain and taste true pleasure for the first time-until a destiny he didn't choose takes him into a future that does not include her...",

    //         rating: 4.08,
    //         name: "A People's History of the United States",
    //         genre:
    //           "Nonfiction,History,North American Hi...,American History,Historical",
    //         image: "https://images.gr-assets.com/books/1494279423l/2767.jpg",
    //       },
    //       {
    //         author: "J.R. Ward",
    //         description:
    //           "He is a Legend.She is a Prodigy.Who will be Champion? June and Day have sacrificed so much for the people of the Republic—and each other—and now their country is on the brink of a new existence. June is back in the good graces of the Republic, working within the government’s elite circles as Princeps-Elect, while Day has been assigned a high-level military position. But neither could have predicted the circumstances that will reunite them: just when a peace treaty is imminent, a plague outbreak causes panic in the Colonies, and war threatens the Republic’s border cities. This new strain of plague is deadlier than ever, and June is the only one who knows the key to her country’s defense. But saving the lives of thousands will mean asking the one she loves to give up everything. With heart-pounding action and suspense, Marie Lu’s bestselling trilogy draws to a stunning conclusion.",

    //         rating: 4.33,
    //         name: "Lover Unbound",
    //         genre:
    //           "Fantasy,Paranormal,Romance,Paranormal Romance,Paranormal,Vampires,Romance,Fantasy",
    //         image: "https://images.gr-assets.com/books/1351276662l/304027.jpg",
    //       },
    //       {
    //         author: "Marie Lu",
    //         description:
    //           "Twenty-seven-year old Anne Elliot is Austen's most adult heroine. Eight years before the story proper begins, she is happily betrothed to a naval officer, Frederick Wentworth, but she precipitously breaks off the engagement when persuaded by her friend Lady Russell that such a match is unworthy. The breakup produces in Anne a deep and long-lasting regret. When later Wentworth returns from sea a rich and successful captain, he finds Anne's family on the brink of financial ruin and his own sister a tenant in Kellynch Hall, the Elliot estate. All the tension of the novel revolves around one question: Will Anne and Wentworth be reunited in their love?Jane Austen once compared her writing to painting on a little bit of ivory, 2 inches square. Readers of Persuasion will discover that neither her skill for delicate, ironic observations on social custom, love, and marriage nor her ability to apply a sharp focus lens to English manners and morals has deserted her in her final finished work.",

    //         rating: 4.36,
    //         name: "Champion",
    //         genre: "Science Fiction,Dystopia,Young Adult,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1382652310l/14290364.jpg",
    //       },
    //       {
    //         author: "Robert Ludlum",
    //         description:
    //           "Dear Reader,I'm sorry to say that the book you are holding in your hands is extremely unpleasant. It tells an unhappy tale about three very unlucky children. Even though they are charming and clever, the Baudelaire siblings lead lives filled with misery and woe. From the very first page of this book when the children are at the beach and receive terrible news, continuing on through the entire story, disaster lurks at their heels. One might say they are magnets for misfortune.In this short book alone, the three youngsters encounter a greedy and repulsive villain, itchy clothing, a disastrous fire, a plot to steal their fortune, and cold porridge for breakfast.It is my sad duty to write down these unpleasant tales, but there is nothing stopping you from putting this book down at once and reading something happy, if you prefer that sort of thing.With all due respect,Lemony Snicket",

    //         rating: 4,
    //         name: "The Bourne Identity",
    //         genre: "Fiction,Thriller,Mystery,Suspense,Spy Thriller,Espionage",
    //         image: "https://images.gr-assets.com/books/1335860740l/7869.jpg",
    //       },
    //       {
    //         author: "Tamora Pierce",
    //         description:
    //           "Winner of the 1973 National Book Award, Gravity's Rainbow is a postmodern epic, a work as exhaustively significant to the second half of the 20th century as Joyce's Ulysses was to the first. Its sprawling, encyclopedic narrative and penetrating analysis of the impact of technology on society make it an intellectual tour de force.",

    //         rating: 4.27,
    //         name: "Alanna: The First Adventure",
    //         genre: "Fantasy,Young Adult,Fiction,Fantasy,Magic,Adventure",
    //         image: "https://images.gr-assets.com/books/1388206270l/13831.jpg",
    //       },
    //       {
    //         author: "Thomas Pynchon",
    //         description:
    //           "'When you read his extraordinary memoir you don't laugh, then cry, then laugh again; you somehow experience these emotions all at once.'Well, this was when Bill was sighing a lot. He had decided that after our parents died he just didn't want any more fighting between what was left of us. He was twenty-four, Beth was twenty-three, I was twenty-one, Toph was eight, and all of us were so tried already, from that winter. So when something would come up, any little thing, some bill to pay or decision to make, he would just sigh, his eyes tired, his mouth in a sorry kind of smile. But Beth and I...Jesus, we were fighting with everyone, anyone, each other, with strangers at bars, anywhere -- we were angry people wanting to exact revenge. We came to California and we wanted everything, would take what was ours, anything within reach. And I decided that little Toph and I, he with his backward hat and long hair, living together in our little house in Berkeley, would be world-destroyers. We inherited each other and, we felt, a responsibility to reinvent everything, to scoff and re-create and drive fast while singing loudly and pounding the windows. It was a hopeless sort of exhilaration, a kind of arrogance born of fatalism, I guess, of the feeling that if you could lose a couple of parents in a month, then basically anything could happen, at any time -- all bullets bear your name, all cars are there to crush you, any balcony could give way; more disaster seemed only logical. And then, as in Dorothy's dream, all these people I grew up with were there, too, some of them orphans also, most but not all of us believing that what we had been given was extraordinary, that it was time to tear or break down, ruin, remake, take and devour. This was San Francisco, you know, and everyone had some dumb idea -- I mean, wicca? -- and no one there would tell you yours was doomed. Thus the public nudity, and this ridiculous magazine, and the Real World tryout, all this need, most of it disguised by sneering, but all driven by a hyper-awareness of this window, I guess, a few years when your muscles are taut, coiled up and vibrating. But what to do with the energy? I mean, when we drive, Toph and I, and we drive past people, standing on top of all these hills, part of me wants to stop the car and turn up the radio and have us all dance in formation, and part of me wants to run them all over.",

    //         rating: 4.03,
    //         name: "Gravity's Rainbow",
    //         genre:
    //           "Fiction,Classics,Science Fiction,Literature,Historical,Historical Fiction,Novels",
    //         image: "https://images.gr-assets.com/books/1414969925l/415.jpg",
    //       },
    //       {
    //         author: "Dave Eggers",
    //         description:
    //           "A Breath of Snow and Ashes continues the extraordinary story of 18th-century Scotsman Jamie Fraser and his 20th-century wife, Claire.The year is 1772, and on the eve of the American Revolution, the long fuse of rebellion has already been lit. Men lie dead in the streets of Boston, and in the backwoods of North Carolina, isolated cabins burn in the forest.With chaos brewing, the governor calls upon Jamie Fraser to unite the backcountry and safeguard the colony for King and Crown. But from his wife Jamie knows that three years hence the shot heard round the world will be fired, and the result will be independence — with those loyal to the King either dead or in exile. And there is also the matter of a tiny clipping from The Wilmington Gazette, dated 1776, which reports Jamie’s death, along with his kin. For once, he hopes, his time-traveling family may be wrong about the future.",

    //         rating: 3.68,
    //         name: "A Heartbreaking Work of Staggering Genius",
    //         genre: "Fiction",
    //         image: "https://images.gr-assets.com/books/1327714834l/4953.jpg",
    //       },
    //       {
    //         author: "Diana Gabaldon",
    //         description:
    //           "“There are only two reasons a non-seer would see a spirit on St. Mark’s Eve,” Neeve said. “Either you’re his true love . . . or you killed him.”It is freezing in the churchyard, even before the dead arrive.Every year, Blue Sargent stands next to her clairvoyant mother as the soon-to-be dead walk past. Blue herself never sees them—not until this year, when a boy emerges from the dark and speaks directly to her.His name is Gansey, and Blue soon discovers that he is a rich student at Aglionby, the local private school. Blue has a policy of staying away from Aglionby boys. Known as Raven Boys, they can only mean trouble.But Blue is drawn to Gansey, in a way she can’t entirely explain. He has it all—family money, good looks, devoted friends—but he’s looking for much more than that. He is on a quest that has encompassed three other Raven Boys: Adam, the scholarship student who resents all the privilege around him; Ronan, the fierce soul who ranges from anger to despair; and Noah, the taciturn watcher of the four, who notices many things but says very little.For as long as she can remember, Blue has been warned that she will cause her true love to die. She never thought this would be a problem. But now, as her life becomes caught up in the strange and sinister world of the Raven Boys, she’s not so sure anymore.From Maggie Stiefvater, the bestselling and acclaimed author of the Shiver trilogy and The Scorpio Races, comes a spellbinding new series where the inevitability of death and the nature of love lead us to a place we’ve never been before.",

    //         rating: 4.43,
    //         name: "A Breath of Snow and Ashes",
    //         genre:
    //           "Historical,Historical Fiction,Romance,Fiction,Fantasy,Science Fiction,Time Travel,Historical",
    //         image: "https://images.gr-assets.com/books/1388197203l/10965.jpg",
    //       },
    //       {
    //         author: "Maggie Stiefvater",
    //         description:
    //           "The only English translation authorized by Aleksandr Solzhenitsyn First published in the Soviet journal Novy Mir in 1962, One Day in the Life of Ivan Denisovich stands as a classic of contemporary literature. The story of labor-camp inmate Ivan Denisovich Shukhov, it graphically describes his struggle to maintain his dignity in the face of communist oppression. An unforgettable portrait of the entire world of Stalin's forced work camps, One Day in the Life of Ivan Denisovich is one of the most extraordinary literary documents to have emerged from the Soviet Union and confirms Solzhenitsyn's stature as a literary genius whose talent matches that of Dosotevsky, Turgenev, Tolstoy--Harrison SalisburyThis unexpurgated 1991 translation by H. T. Willetts is the only authorized edition available and fully captures the power and beauty of the original Russian.",

    //         rating: 4.06,
    //         name: "The Raven Boys",
    //         genre: "Fantasy,Young Adult,Fantasy,Paranormal,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1477103737l/17675462.jpg",
    //       },
    //       {
    //         author: "Ursula K. Le Guin",
    //         description:
    //           "This daring literary thriller, rich with eroticism and suspense, is one of John Fowles's best-loved and bestselling novels and has contributed significantly to his international reputation as a writer of the first degree. At the center of The Magus is Nicholas Urfe, a young Englishman who accepts a teaching position on a remote Greek island, where he befriends a local millionaire. The friendship soon evolves into a deadly game, in which reality and fantasy are deliberately manipulated, and Nicholas finds that he must fight not only for his sanity but for his very survival.",

    //         rating: 4,
    //         name: "A Wizard of Earthsea",
    //         genre: "Fantasy,Fiction,Young Adult,Classics",
    //         image: "https://images.gr-assets.com/books/1353424536l/13642.jpg",
    //       },
    //       {
    //         author: "John Fowles",
    //         description:
    //           "Jitterbug Perfume is an epic, which is to say, it begins in the forests of ancient Bohemia and doesn't conclude until nine o'clock tonight [Paris time]. It is a saga, as well. A saga must have a hero, and the hero of this one is a janitor with a missing bottle. The bottle is blue, very, very old, and embossed with the image of a goat-horned god. If the liquid in the bottle is actually is the secret essence of the universe, as some folks seem to think, it had better be discovered soon because it is leaking and there is only a drop or two left.",

    //         rating: 4.05,
    //         name: "The Magus",
    //         genre: "Fiction,Classics,Fantasy,Mystery,Literature",
    //         image: "https://images.gr-assets.com/books/1441323311l/16286.jpg",
    //       },
    //       {
    //         author: "Tom Robbins",
    //         description:
    //           "Prodigal Summer weaves together three stories of human love within a larger tapestry of lives inhabiting the forested mountains and struggling small farms of southern Appalachia.From her outpost in an isolated mountain cabin, Deanna Wolfe, a reclusive wildlife biologist, watches a den of coyotes that have recently migrated into the region. She is caught off-guard by a young hunter who invades her most private spaces and confounds her self-assured, solitary life. On a farm several miles down the mountain, Lusa Maluf Landowski, a bookish city girl turned farmer's wife, finds herself unexpectedly marooned in a strange place where she must declare or lose her attachment to the land that has become her own. And a few more miles down the road, a pair of elderly feuding neighbors tend their respective farms and wrangle about God, pesticides, and the possibilities of a future neither of them expected.Over the course of one humid summer, these characters find their connections to one another and to the flora and fauna with whom they share a place. Prodigal Summer demonstrates a balance of narrative, drama and ideas that is characteristic of Barbara Kingsolver's finest work.",

    //         rating: 4.24,
    //         name: "Jitterbug Perfume",
    //         genre: "Fiction,Fantasy,Humor,Magical Realism,Literature",
    //         image: "https://images.gr-assets.com/books/1388607752l/8682.jpg",
    //       },
    //       {
    //         author: "Barbara Kingsolver",
    //         description:
    //           "A groundbreaking work of science fiction, The Left Hand of Darkness tells the story of a lone human emissary to Winter, an alien world whose inhabitants can choose -and change - their gender. His goal is to facilitate Winter's inclusion in a growing intergalactic civilization. But to do so he must bridge the gulf between his own views and those of the completely dissimilar culture that he encounters. Embracing the aspects of psychology, society, and human emotion on an alien world, The Left Hand of Darkness stands as a landmark achievement in the annals of intellectual science fiction.",

    //         rating: 3.99,
    //         name: "Prodigal Summer",
    //         genre: "Fiction,Contemporary,Environment,Nature",
    //         image: "https://images.gr-assets.com/books/1426308771l/14249.jpg",
    //       },
    //       {
    //         author: "Ursula K. Le Guin",
    //         description:
    //           "First published in 1959, Shirley Jackson's The Haunting of Hill House has been hailed as a perfect work of unnerving terror. It is the story of four seekers who arrive at a notoriously unfriendly pile called Hill House: Dr. Montague, an occult scholar looking for solid evidence of a haunting; Theodora, his lighthearted assistant; Eleanor, a friendless, fragile young woman well acquainted with poltergeists; and Luke, the future heir of Hill House. At first, their stay seems destined to be merely a spooky encounter with inexplicable phenomena. But Hill House is gathering its powers—and soon it will choose one of them to make its own.",

    //         rating: 4.06,
    //         name: "The Left Hand of Darkness",
    //         genre: "Science Fiction,Fiction,Fantasy,Classics",
    //         image: "https://images.gr-assets.com/books/1488213612l/18423.jpg",
    //       },
    //       {
    //         author: "Louis de-Bernières",
    //         description:
    //           "Oryx and Crake is at once an unforgettable love story and a compelling vision of the future. Snowman, known as Jimmy before mankind was overwhelmed by a plague, is struggling to survive in a world where he may be the last human, and mourning the loss of his best friend, Crake, and the beautiful and elusive Oryx whom they both loved. In search of answers, Snowman embarks on a journey–with the help of the green-eyed Children of Crake–through the lush wilderness that was so recently a great city, until powerful corporations took mankind on an uncontrolled genetic engineering ride. Margaret Atwood projects us into a near future that is both all too familiar and beyond our imagining.",

    //         rating: 3.96,
    //         name: "Corelli's Mandolin",
    //         genre:
    //           "Fiction,Historical,Historical Fiction,Romance,Classics,War,Historical",
    //         image: "https://images.gr-assets.com/books/1479680795l/3388.jpg",
    //       },
    //       {
    //         author: "Margaret Atwood",
    //         description:
    //           "The Grimm brothers were early 19th-century writers best known for their fairy tales coming from Scandinavian, Icelandic and Germanic origins. By 1807 there was a growing interest in German folk tales. The Grimm brothers were academics who invited friends to their home and asked them to relate stories they had heard. They soon published their first collection of tales and from there several more volumes followed.This compilation of fairy tales which includes the complete canon of over 200 tales has become a beloved set of classical stories the world over. Included in this collection are Hansel and Gretel, Briar Rose, The Fisherman and His Wife, Rapunzel, The Frog Prince, Little Red Riding Hood, Rumpelstiltskin, Tom Thumb, and many more. These stories are a delight to read and will rekindle up many childhood memories as they are reread. Presented here in this edition is the faithful translation of Margaret Hunt.",

    //         rating: 4,
    //         name: "Oryx and Crake",
    //         genre:
    //           "Fiction,Science Fiction,Science Fiction,Dystopia,Apocalyptic,Post Apocalyptic,Fantasy",
    //         image: "https://images.gr-assets.com/books/1494109986l/46756.jpg",
    //       },
    //       {
    //         author: "Nicholas Sparks",
    //         description:
    //           "In the ten years since its publication in 1988, Stephen Hawking's classic work has become a landmark volume in scientific writing, with more than nine million copies in forty languages sold worldwide. That edition was on the cutting edge of what was then known about the origins and nature of the universe. But the intervening years have seen extraordinary advances in the technology of observing both the micro- and the macrocosmic worlds. These observations have confirmed many of Professor Hawking's theoretical predictions in the first edition of his book, including the recent discoveries of the Cosmic Background Explorer satellite (COBE), which probed back in time to within 300,000 years of the universe's beginning and revealed wrinkles in the fabric of space-time that he had projected. Eager to bring to his original text the new knowledge revealed by these observations, as well as his own recent research, Professor Hawking has prepared a new introduction to the book, written an entirely new chapter on wormholes and time travel, and updated the chapters throughout.",

    //         rating: 3.95,
    //         name: "Message in a Bottle",
    //         genre: "Romance,Fiction,Womens Fiction,Chick Lit,Contemporary",
    //         image: "https://images.gr-assets.com/books/1163789140l/3478.jpg",
    //       },
    //       {
    //         author: "Terry Pratchett",
    //         description:
    //           "From the author of the popular Weather Warden series comes the debut of an exciting new series set in Morganville, Texas, where you would be well advised to avoid being out after dark.College freshman Claire Danvers has had enough of her nightmarish dorm situation. When Claire heads off-campus, the imposing old house where she finds a room may not be much better. Her new roommates don't show many signs of life, but they'll have Claire's back when the town's deepest secrets come crawling out, hungry for fresh blood. Will she be able to face the town's terror or will she drown like everyone else?",

    //         rating: 4.48,
    //         name: "Night Watch",
    //         genre: "Fantasy,Humor,Fiction,Science Fiction Fantasy",
    //         image: "https://images.gr-assets.com/books/1320518310l/47989.jpg",
    //       },
    //       {
    //         author: "Raymond Chandler",
    //         description:
    //           "The year is 1984 and the city is Tokyo.A young woman named Aomame follows a taxi driver’s enigmatic suggestion and begins to notice puzzling discrepancies in the world around her. She has entered, she realizes, a parallel existence, which she calls 1Q84 —“Q is for ‘question mark.’ A world that bears a question.” Meanwhile, an aspiring writer named Tengo takes on a suspect ghostwriting project. He becomes so wrapped up with the work and its unusual author that, soon, his previously placid life begins to come unraveled. As Aomame’s and Tengo’s narratives converge over the course of this single year, we learn of the profound and tangled connections that bind them ever closer: a beautiful, dyslexic teenage girl with a unique vision; a mysterious religious cult that instigated a shoot-out with the metropolitan police; a reclusive, wealthy dowager who runs a shelter for abused women; a hideously ugly private investigator; a mild-mannered yet ruthlessly efficient bodyguard; and a peculiarly insistent television-fee collector.A love story, a mystery, a fantasy, a novel of self-discovery, a dystopia to rival George Orwell’s — 1Q84 is Haruki Murakami’s most ambitious undertaking yet: an instant best seller in his native Japan, and a tremendous feat of imagination from one of our most revered contemporary writers.",

    //         rating: 4.02,
    //         name: "The Big Sleep",
    //         genre:
    //           "Mystery,Fiction,Mystery,Crime,Classics,Mystery,Noir,Mystery,Detective",
    //         image: "https://images.gr-assets.com/books/1371584712l/2052.jpg",
    //       },
    //       {
    //         author: "Michael Pollan",
    //         description:
    //           "'If I had my way, every idiot who goes around with Merry Christmas on his lips, would be boiled with his own pudding, and buried with a stake of holly through his heart. Merry Christmas? Bah humbug!'Introduction and Afterword by Joe WheelerTo bitter, miserly Ebenezer Scrooge, Christmas is just another day. But all that changes when the ghost of his long-dead business partner appears, warning Scrooge to change his ways before it's too late. Part of the Focus on the Family Great Stories collection, this edition features an in-depth introduction and discussion questions by Joe Wheeler to provide greater understanding for today's reader. A Christmas Carol captures the heart of the holidays like no other novel.",

    //         rating: 4.18,
    //         name: "The Omnivore's Dilemma: A Natural History of Four Meals",
    //         genre:
    //           "Nonfiction,Food and Drink,Food,Science,Health,History,Health,Nutrition",
    //         image: "https://images.gr-assets.com/books/1393804353l/3109.jpg",
    //       },
    //       {
    //         author: "Walter Scott",
    //         description:
    //           "The queen has returned.Everyone Celaena Sardothien loves has been taken from her. But she’s at last returned to the empire—for vengeance, to rescue her once-glorious kingdom, and to confront the shadows of her past…She has embraced her identity as Aelin Galathynius, Queen of Terrasen. But before she can reclaim her throne, she must fight.She will fight for her cousin, a warrior prepared to die for her. She will fight for her friend, a young man trapped in an unspeakable prison. And she will fight for her people, enslaved to a brutal king and awaiting their lost queen’s triumphant return.The fourth volume in the New York Times bestselling series continues Celaena’s epic journey and builds to a passionate, agonizing crescendo that might just shatter her world.",

    //         rating: 3.75,
    //         name: "Ivanhoe",
    //         genre:
    //           "Classics,Historical,Historical Fiction,Fiction,Adventure,Literature",
    //         image: "https://images.gr-assets.com/books/1405336818l/6440.jpg",
    //       },
    //       {
    //         author: "Chaim Potok",
    //         description:
    //           "From a top secret government laboratory come two genetically altered life forms. One is a magnificent dog of astonishing intelligence. The other, a hybrid monster of a brutally violent nature. And both are on the loose…Bestselling author Dean Koontz presents his most terrifying, dramatic and moving novel: The explosive story of a man and a woman, caught in a relentless storm of mankind’s darkest creation…",

    //         rating: 4.19,
    //         name: "My Name Is Asher Lev",
    //         genre:
    //           "Fiction,Classics,Historical,Historical Fiction,Literature,Jewish,Religion,Religion,Judaism",
    //         image: "https://images.gr-assets.com/books/1385056726l/11507.jpg",
    //       },
    //       {
    //         author: "Dean Koontz",
    //         description:
    //           "Cocktail waitress Sookie Stackhouse is having a streak of bad luck. First her co-worker is killed, and no one seems to care. Then she comes face to-face with a beastly creature that gives her a painful and poisonous lashing. Enter the vampires, who graciously suck the poison from her veins (like they didn't enjoy it).The point is: they saved her life. So when one of the bloodsuckers asks for a favor, she obliges - and soon Sookie's in Dallas, using her telepathic skills to search for a missing vampire. She's supposed to interview certain humans involved, but she makes one condition: the vampires must promise to behave and let the humans go unharmed. But that's easier said than done, and all it takes is one delicious blonde and one small mistake for things to turn deadly....",

    //         rating: 4.17,
    //         name: "Watchers",
    //         genre: "Fiction,Thriller,Horror,Science Fiction,Mystery,Suspense",
    //         image: "https://images.gr-assets.com/books/1532695250l/32423.jpg",
    //       },
    //       {
    //         author: "Charlaine Harris",
    //         description:
    //           "The dead don't talk. I don't know why. But they do try to communicate, with a short-order cook in a small desert town serving as their reluctant confidant. Odd Thomas thinks of himself as an ordinary guy, if possessed of a certain measure of talent at the Pico Mundo Grill and rapturously in love with the most beautiful girl in the world, Stormy Llewellyn.Maybe he has a gift, maybe it's a curse, Odd has never been sure, but he tries to do his best by the silent souls who seek him out. Sometimes they want justice, and Odd's otherworldly tips to Pico Mundo's sympathetic police chief, Wyatt Porter, can solve a crime. Occasionally they can prevent one. But this time it's different.A mysterious man comes to town with a voracious appetite, a filing cabinet stuffed with information on the world's worst killers, and a pack of hyena-like shades following him wherever he goes. Who the man is and what he wants, not even Odd's deceased informants can tell him. His most ominous clue is a page ripped from a day-by-day calendar for August 15.Today is August 14.In less than twenty-four hours, Pico Mundo will awaken to a day of catastrophe. As evil coils under the searing desert sun, Odd travels through the shifting prisms of his world, struggling to avert a looming cataclysm with the aid of his soul mate and an unlikely community of allies that includes the King of Rock 'n' Roll. His account of two shattering days when past and present, fate and destiny converge is the stuff of our worst nightmares, and a testament by which to live: sanely if not safely, with courage, humor, and a full heart that even in the darkness must persevere.",

    //         rating: 3.97,
    //         name: "Living Dead in Dallas",
    //         genre:
    //           "Fantasy,Paranormal,Vampires,Fantasy,Paranormal,Fantasy,Urban Fantasy,Fiction,Romance,Mystery,Romance,Paranormal Romance,Fantasy,Supernatural,Adult",
    //         image: "https://images.gr-assets.com/books/1329501808l/110494.jpg",
    //       },
    //       {
    //         author: "Dean Koontz",
    //         description:
    //           "Cosmos has 13 heavily illustrated chapters, corresponding to the 13 episodes of the Cosmos television series. In the book, Sagan explores 15 billion years of cosmic evolution and the development of science and civilization. Cosmos traces the origins of knowledge and the scientific method, mixing science and philosophy, and speculates to the future of science. The book also discusses the underlying premises of science by providing biographical anecdotes about many prominent scientists throughout history, placing their contributions into the broader context of the development of modern science.The book covers a broad range of topics, comprising Sagan's reflections on anthropological, cosmological, biological, historical, and astronomical matters from antiquity to contemporary times. Sagan reiterates his position on extraterrestrial life—that the magnitude of the universe permits the existence of thousands of alien civilizations, but no credible evidence exists to demonstrate that such life has ever visited earth.",

    //         rating: 3.95,
    //         name: "Odd Thomas",
    //         genre: "Horror,Fiction,Mystery,Fantasy,Thriller,Fantasy,Paranormal",
    //         image: "https://images.gr-assets.com/books/1388245669l/14995.jpg",
    //       },
    //       {
    //         author: "Carl Sagan",
    //         description:
    //           "The Sirens of Titan is an outrageous romp through space, time, and morality. The richest, most depraved man on Earth, Malachi Constant, is offered a chance to take a space journey to distant worlds with a beautiful woman at his side. Of course there's a catch to the invitation—and a prophetic vision about the purpose of human life that only Vonnegut has the courage to tell.",

    //         rating: 4.36,
    //         name: "Cosmos",
    //         genre:
    //           "Science,Nonfiction,Science,Astronomy,Science,Physics,History",
    //         image: "https://images.gr-assets.com/books/1388620656l/55030.jpg",
    //       },
    //       {
    //         author: "Kurt Vonnegut",
    //         description:
    //           "When The Alienist was first published in 1994, it was a major phenomenon, spending six months on the New York Times bestseller list, receiving critical acclaim, and selling millions of copies. This modern classic continues to be a touchstone of historical suspense fiction for readers everywhere.The year is 1896. The city is New York. Newspaper reporter John Schuyler Moore is summoned by his friend Dr. Laszlo Kreizler—a psychologist, or “alienist”—to view the horribly mutilated body of an adolescent boy abandoned on the unfinished Williamsburg Bridge. From there the two embark on a revolutionary effort in criminology: creating a psychological profile of the perpetrator based on the details of his crimes. Their dangerous quest takes them into the tortured past and twisted mind of a murderer who will kill again before their hunt is over.Fast-paced and riveting, infused with historical detail, The Alienist conjures up Gilded Age New York, with its tenements and mansions, corrupt cops and flamboyant gangsters, shining opera houses and seamy gin mills. It is an age in which questioning society’s belief that all killers are born, not made, could have unexpected and fatal consequences.",

    //         rating: 4.16,
    //         name: "The Sirens of Titan",
    //         genre: "Science Fiction,Fiction,Classics",
    //         image: "https://images.gr-assets.com/books/1419363185l/4982.jpg",
    //       },
    //       {
    //         author: "Dan Brown",
    //         description:
    //           "When suburban Claudia Kincaid decides to run away, she knows she doesn’t just want to run from somewhere, she wants to run to somewhere — to a place that is comfortable, beautiful, and, preferably, elegant. She chooses the Metropolitan Museum of Art in New York City. Knowing her younger brother Jamie has money and thus can help her with a serious cash-flow problem, she invites him along.Once settled into the museum, Claudia and Jamie find themselves caught up in the mystery of an angel statue that the museum purchased at auction for a bargain price of $225. The statue is possibly an early work of the Renaissance master, Michelangelo, and therefore worth millions. Is it? Or isn’t it? Claudia is determined to find out. Her quest leads her to Mrs. Basil E. Frankweiler, the remarkable old woman who sold the statue, and to some equally remarkable discoveries about herself.",

    //         rating: 3.82,
    //         name: "Inferno",
    //         genre: "Fiction,Mystery,Thriller,Historical,Historical Fiction",
    //         image:
    //           "https://images.gr-assets.com/books/1534070896l/17212231.jpg",
    //       },
    //       {
    //         author: "E.L. Konigsburg",
    //         description:
    //           "Welcome to Battleschool.Growing up is never easy. But try living on the mean streets as a child begging for food and fighting like a dog with ruthless gangs of starving kids who wouldn't hesitate to pound your skull into pulp for a scrap of apple. If Bean has learned anything on the streets, it's how to survive. And not with fists—He is way too small for that—But with brains.Bean is a genius with a magician's ability to zero in on his enemy and exploit his weakness.What better quality for a future general to lead the Earth in a final climactic battle against a hostile alien race, known as Buggers. At Battleschool Bean meets and befriends another future commander—Ender Wiggins—perhaps his only true rival.Only one problem: for Bean and Ender, the future is now.",

    //         rating: 4.15,
    //         name: "From the Mixed-Up Files of Mrs. Basil E. Frankweiler",
    //         genre: "Fiction,Childrens,Young Adult,Mystery,Classics",
    //         image: "https://images.gr-assets.com/books/1327784751l/3980.jpg",
    //       },
    //       {
    //         author: "Robin Hobb",
    //         description:
    //           "Which is more dangerous, a gun or a swimming pool? What do schoolteachers and sumo wrestlers have in common? Why do drug dealers still live with their moms? How much do parents really matter? What kind of impact did Roe v. Wade have on violent crime? Freakonomics will literally redefine the way we view the modern world.These may not sound like typical questions for an economist to ask. But Steven D. Levitt is not a typical economist. He is a much heralded scholar who studies the stuff and riddles of everyday life -- from cheating and crime to sports and child rearing -- and whose conclusions regularly turn the conventional wisdom on its head. He usually begins with a mountain of data and a simple, unasked question. Some of these questions concern life-and-death issues; others have an admittedly freakish quality. Thus the new field of study contained in this book: freakonomics.Through forceful storytelling and wry insight, Levitt and co-author Stephen J. Dubner show that economics is, at root, the study of incentives -- how people get what they want, or need, especially when other people want or need the same thing. In Freakonomics, they set out to explore the hidden side of ... well, everything. The inner workings of a crack gang. The truth about real-estate agents. The myths of campaign finance. The telltale marks of a cheating schoolteacher. The secrets of the Ku Klux Klan.What unites all these stories is a belief that the modern world, despite a surfeit of obfuscation, complication, and downright deceit, is not impenetrable, is not unknowable, and -- if the right questions are asked -- is even more intriguing than we think. All it takes is a new way of looking. Steven Levitt, through devilishly clever and clear-eyed thinking, shows how to see through all the clutter.Freakonomics establishes this unconventional premise: If morality represents how we would like the world to work, then economics represents how it actually does work. It is true that readers of this book will be armed with enough riddles and stories to last a thousand cocktail parties. But Freakonomics can provide more than that. It will literally redefine the way we view the modern world.",

    //         rating: 4.15,
    //         name: "Assassin's Apprentice",
    //         genre: "Fantasy,Fiction,Fantasy,Epic Fantasy,Fantasy,High Fantasy",
    //         image: "https://images.gr-assets.com/books/1320339497l/45107.jpg",
    //       },
    //       {
    //         author: "David Nicholls",
    //         description:
    //           "The Power Of Myth launched an extraordinary resurgence of interest in Joseph Campbell and his work. A preeminent scholar, writer, and teacher, he has had a profound influence on millions of people. To him, mythology was the song of the universe, the music of the spheres. With Bill Moyers, one of America's most prominent journalists, as his thoughtful and engaging interviewer, The Power Of Myth touches on subjects from modern marriage to virgin births, from Jesus to John Lennon, offering a brilliant combination of intelligence and wit.",

    //         rating: 3.78,
    //         name: "One Day",
    //         genre: "Fiction,Romance,Contemporary,Womens Fiction,Chick Lit",
    //         image: "https://images.gr-assets.com/books/1327873020l/6280118.jpg",
    //       },
    //       {
    //         author: "Anne Morrow Lindbergh",
    //         description:
    //           "An American classic rediscovered by each generation, The Story of My Life is Helen Keller’s account of her triumph over deafness and blindness. Popularized by the stage play and movie The Miracle Worker, Keller’s story has become a symbol of hope for people all over the world. This book–published when Keller was only twenty-two–portrays the wild child who is locked in the dark and silent prison of her own body. With an extraordinary immediacy, Keller reveals her frustrations and rage, and takes the reader on the unforgettable journey of her education and breakthroughs into the world of communication. From the moment Keller recognizes the word “water” when her teacher finger-spells the letters, we share her triumph as “that living word awakened my soul, gave it light, hope, joy, set it free!” An unparalleled chronicle of courage, The Story of My Life remains startlingly fresh and vital more than a century after its first publication, a timeless testament to an indomitable will.",

    //         rating: 4.17,
    //         name: "Gift from the Sea",
    //         genre: "Nonfiction,Autobiography,Memoir,Classics,Inspirational",
    //         image: "https://images.gr-assets.com/books/1328312670l/77295.jpg",
    //       },
    //       {
    //         author: "Helen Keller",
    //         description:
    //           "Milkman Dead was born shortly after a neighborhood eccentric hurled himself off a rooftop in a vain attempt at flight. For the rest of his life he, too, will be trying to fly. With this brilliantly imagined novel, Toni Morrison transfigures the coming-of-age story as audaciously as Saul Bellow or Gabriel García Márquez. As she follows Milkman from his rustbelt city to the place of his family’s origins, Morrison introduces an entire cast of strivers and seeresses, liars and assassins, the inhabitants of a fully realized black world.",

    //         rating: 4.07,
    //         name: "The Story of My Life",
    //         genre:
    //           "Nonfiction,Biography,Classics,Autobiography,Memoir,Biography,Autobiography,History",
    //         image: "https://images.gr-assets.com/books/1320429331l/821611.jpg",
    //       },
    //       {
    //         author: "Toni Morrison",
    //         description:
    //           "Winner of the National Book Award for FictionNominated for the National Book Critics Circle AwardAn American Library Association Notable BookJonathan Franzen's third novel, The Corrections, is a great work of art and a grandly entertaining overture to our new century: a bold, comic, tragic, deeply moving family drama that stretches from the Midwest at mid-century to Wall Street and Eastern Europe in the age of greed and globalism. Franzen brings an old-time America of freight trains and civic duty, of Cub Scouts and Christmas cookies and sexual inhibitions, into brilliant collision with the modern absurdities of brain science, home surveillance, hands-off parenting, do-it-yourself mental healthcare, and the anti-gravity New Economy. With The Corrections, Franzen emerges as one of our premier interpreters of American society and the American soul.Enid Lambert is terribly, terribly anxious. Although she would never admit it to her neighbors or her three grown children, her husband, Alfred, is losing his grip on reality. Maybe it's the medication that Alfred takes for his Parkinson's disease, or maybe it's his negative attitude, but he spends his days brooding in the basement and committing shadowy, unspeakable acts. More and more often, he doesn't seem to understand a word Enid says.Trouble is also brewing in the lives of Enid's children. Her older son, Gary, a banker in Philadelphia, has turned cruel and materialistic and is trying to force his parents out of their old house and into a tiny apartment. The middle child, Chip, has suddenly and for no good reason quit his exciting job as a professor at D------ College and moved to New York City, where he seems to be pursuing a transgressive lifestyle and writing some sort of screenplay. Meanwhile the baby of the family, Denise, has escaped her disastrous marriage only to pour her youth and beauty down the drain of an affair with a married man--or so Gary hints.Enid, who loves to have fun, can still look forward to a final family Christmas and to the ten-day Nordic Pleasurelines Luxury Fall Color Cruise that she and Alfred are about to embark on. But even these few remaining joys are threatened by her husband's growing confusion and unsteadiness. As Alfred enters his final decline, the Lamberts must face the failures, secrets, and long-buried hurts that haunt them as a family if they are to make the corrections that each desperately needs.",

    //         rating: 4.03,
    //         name: "Song of Solomon",
    //         genre:
    //           "Fiction,Classics,Cultural,African American,Historical,Historical Fiction,Literature",
    //         image: "https://images.gr-assets.com/books/1451448230l/11334.jpg",
    //       },
    //       {
    //         author: "Jonathan Franzen",
    //         description:
    //           "On an entirely normal, beautiful fall day in Chester's Mill, Maine, the town is inexplicably and suddenly sealed off from the rest of the world by an invisible force field. Planes crash into it and fall from the sky in flaming wreckage, a gardener's hand is severed as the dome comes down on it, people running errands in the neighboring town are divided from their families, and cars explode on impact. No one can fathom what this barrier is, where it came from, and when -- or if -- it will go away.  Dale Barbara, Iraq vet and now a short-order cook, finds himself teamed with a few intrepid citizens -- town newspaper owner Julia Shumway, a physician's assistant at the hospital, a select-woman, and three brave kids. Against them stands Big Jim Rennie, a politician who will stop at nothing -- even murder -- to hold the reins of power, and his son, who is keeping a horrible secret in a dark pantry. But their main adversary is the Dome itself. Because time isn't just short. It's running out.",

    //         rating: 3.79,
    //         name: "The Corrections",
    //         genre: "Fiction,Contemporary,Novels",
    //         image: "https://images.gr-assets.com/books/1355011305l/3805.jpg",
    //       },
    //       {
    //         author: "Stephen King",
    //         description:
    //           "The Bluest Eye is Toni Morrison's first novel, a book heralded for its richness of language and boldness of vision. Set in the author's girlhood hometown of Lorain, Ohio, it tells the story of black, eleven-year-old Pecola Breedlove. Pecola prays for her eyes to turn blue so that she will be as beautiful and beloved as all the blond, blue-eyed children in America. In the autumn of 1941, the year the marigolds in the Breedloves' garden do not bloom. Pecola's life does change- in painful, devastating ways.What its vivid evocation of the fear and loneliness at the heart of a child's yearning, and the tragedy of its fulfillment. The Bluest Eye remains one of Tony Morrisons's most powerful, unforgettable novels- and a significant work of American fiction.",

    //         rating: 3.9,
    //         name: "Under the Dome",
    //         genre: "Horror,Fiction,Science Fiction,Thriller",
    //         image: "https://images.gr-assets.com/books/1511289992l/6320534.jpg",
    //       },
    //       {
    //         author: "Toni Morrison",
    //         description:
    //           "When Isabel Archer, a beautiful, spirited American, is brought to Europe by her wealthy Aunt Touchett, it is expected that she will soon marry. But Isabel, resolved to determine her own fate, does not hesitate to turn down two eligible suitors. She then finds herself irresistibly drawn to Gilbert Osmond, who, beneath his veneer of charm and cultivation, is cruelty itself. A story of intense poignancy, Isabel's tale of love and betrayal still resonates with modern audiences.",

    //         rating: 4,
    //         name: "The Bluest Eye",
    //         genre:
    //           "Fiction,Classics,Historical,Historical Fiction,Cultural,African American,Literature",
    //         image: "https://images.gr-assets.com/books/1388208495l/11337.jpg",
    //       },
    //       {
    //         author: "Neal Stephenson",
    //         description:
    //           "How about a story? Spin us a yarn.Instantly, Phoebe Winterbottom came to mind. I could tell you an extensively strange story, I warned.Oh, good! Gram said. Delicious!And that is how I happened to tell them about Phoebe, her disappearing mother, and the lunatic.As Sal entertains her grandparents with Phoebe's outrageous story, her own story begins to unfold — the story of a thirteen-year-old girl whose only wish is to be reunited with her missing mother.In her own award-winning style, Sharon Creech intricately weaves together two tales, one funny, one bittersweet, to create a heartwarming, compelling, and utterly moving story of love, loss, and the complexity of human emotion.",

    //         rating: 4.25,
    //         name: "Cryptonomicon",
    //         genre:
    //           "Fiction,Science Fiction,Historical,Historical Fiction,Science Fiction,Cyberpunk",
    //         image: "https://images.gr-assets.com/books/1327931476l/816.jpg",
    //       },
    //       {
    //         author: "Sharon Creech",
    //         description:
    //           "One Fish Two Fish Red Fish Blue Fish is a 1960 children's book by Dr. Seuss (Theodor Seuss Geisel). A simple rhyming book for learner readers, it is a book with a freewheeling plot about a boy and a girl, and the many amazing creatures they have for friends and pets. One Fish Two Fish Red Fish Blue Fish was part of the Beginner Book Video series which included Oh, the Thinks You Can Think! and The Foot Book.",

    //         rating: 3.96,
    //         name: "Walk Two Moons",
    //         genre:
    //           "Young Adult,Fiction,Realistic Fiction,Childrens,Childrens,Middle Grade",
    //         image: "https://images.gr-assets.com/books/1389035862l/53496.jpg",
    //       },
    //       {
    //         author: "Shannon Hale",
    //         description:
    //           "Kate DiCamillo’s beloved, best-selling debut novel is now available in a paperback digest edition.Kate DiCamillo’s first published novel, like Winn-Dixie himself, immediately proved to be a keeper — a New York Times bestseller, a Newbery Honor winner, the inspiration for a popular film, and most especially, a cherished classic that touches the hearts of readers of all ages. It’s now available in a paperback digest format certain to bring this tale’s magic to an even wider circle of fans.The summer Opal and her father, the preacher, move to Naomi, Florida, Opal goes into the Winn-Dixie supermarket--and comes out with a dog. A big, ugly, suffering dog with a sterling sense of humor. A dog she dubs Winn-Dixie. Because of Winn-Dixie, the preacher tells Opal ten things about her absent mother, one for each year Opal has been alive. Winn-Dixie is better at making friends than anyone Opal has ever known, and together they meet the local librarian, Miss Franny Block, who once fought off a bear with a copy of WAR AND PEACE. They meet Gloria Dump, who is nearly blind but sees with her heart, and Otis, an ex-con who sets the animals in his pet shop loose after hours, then lulls them with his guitar.Opal spends all that sweet summer collecting stories about her new friends and thinking about her mother. But because of Winn-Dixie or perhaps because she has grown, Opal learns to let go, just a little, and that friendship—and forgiveness—can sneak up on you like a sudden summer storm.",

    //         rating: 4.02,
    //         name: "Princess Academy",
    //         genre:
    //           "Fantasy,Young Adult,Fiction,Childrens,Middle Grade,Childrens,Romance",
    //         image: "https://images.gr-assets.com/books/1349410861l/85990.jpg",
    //       },
    //       {
    //         author: "Kate DiCamillo",
    //         description:
    //           "Jhumpa Lahiri's Interpreter of Maladies established this young writer as one the most brilliant of her generation. Her stories are one of the very few debut works -- and only a handful of collections -- to have won the Pulitzer Prize for fiction. Among the many other awards and honors it received were the New Yorker Debut of the Year award, the PEN/Hemingway Award, and the highest critical praise for its grace, acuity, and compassion in detailing lives transported from India to America.In The Namesake, Lahiri enriches the themes that made her collection an international bestseller: the immigrant experience, the clash of cultures, the conflicts of assimilation, and, most poignantly, the tangled ties between generations. Here again Lahiri displays her deft touch for the perfect detail — the fleeting moment, the turn of phrase — that opens whole worlds of emotion.The Namesake takes the Ganguli family from their tradition-bound life in Calcutta through their fraught transformation into Americans. On the heels of their arranged wedding, Ashoke and Ashima Ganguli settle together in Cambridge, Massachusetts. An engineer by training, Ashoke adapts far less warily than his wife, who resists all things American and pines for her family. When their son is born, the task of naming him betrays the vexed results of bringing old ways to the new world. Named for a Russian writer by his Indian parents in memory of a catastrophe years before, Gogol Ganguli knows only that he suffers the burden of his heritage as well as his odd, antic name. Lahiri brings great empathy to Gogol as he stumbles along the first-generation path, strewn with conflicting loyalties, comic detours, and wrenching love affairs. With penetrating insight, she reveals not only the defining power of the names and expectations bestowed upon us by our parents, but also the means by which we slowly, sometimes painfully, come to define ourselves.",

    //         rating: 4.02,
    //         name: "Because of Winn-Dixie",
    //         genre:
    //           "Fiction,Childrens,Realistic Fiction,Young Adult,Childrens,Middle Grade",
    //         image: "https://images.gr-assets.com/books/1456871914l/357664.jpg",
    //       },
    //       {
    //         author: "Jhumpa Lahiri",
    //         description:
    //           "'A narrative particle accelerator that zooms between Wild Turkey Whiskey and Bob Dylan, unicorn skulls and voracious librarians, John Coltrane and Lord Jim. Science fiction, detective story and post-modern manifesto all rolled into one rip-roaring novel, Hard-Boiled Wonderland and the End of the World is the tour de force that expanded Haruki Murakami's international following. Tracking one man's descent into the Kafkaesque underworld of contemporary Tokyo, Murakami unites East and West, tragedy and farce, compassion and detachment, slang and philosophy.'",

    //         rating: 3.97,
    //         name: "The Namesake",
    //         genre: "Fiction,Cultural,India,Contemporary",
    //         image: "https://images.gr-assets.com/books/1480106986l/33917.jpg",
    //       },
    //       {
    //         author: "Dan Brown",
    //         description:
    //           "In this dizzyingly rich novel of ideas, Mann uses a sanatorium in the Swiss Alps, a community devoted exclusively to sickness, as a microcosm for Europe, which in the years before 1914 was already exhibiting the first symptoms of its own terminal irrationality. The Magic Mountain is a monumental work of erudition and irony, sexual tension and intellectual ferment, a book that pulses with life in the midst of death.",

    //         rating: 3.63,
    //         name: "Digital Fortress",
    //         genre: "Fiction,Thriller,Mystery,Suspense",
    //         image: "https://images.gr-assets.com/books/1360095966l/11125.jpg",
    //       },
    //       {
    //         author: "Becca Fitzpatrick",
    //         description:
    //           "Winner of the 1961 Hugo Award for Best Novel and widely considered one of the most accomplished, powerful, and enduring classics of modern speculative fiction, Walter M. Miller, Jr.'s A Canticle for Leibowitz is a true landmark of twentieth-century literature—a chilling and still provocative look at a post-apocalyptic future.In a nightmarish ruined world slowly awakening to the light after sleeping in darkness, the infant rediscoveries of science are secretly nourished by cloistered monks dedicated to the study and preservation of the relics and writings of the blessed Saint Isaac Leibowitz. From here the story spans centuries of ignorance, violence, and barbarism, viewing through a sharp, satirical eye the relentless progression of a human race damned by its inherent humanness to recelebrate its grand foibles and repeat its grievous mistakes. Seriously funny, stunning, and tragic, eternally fresh, imaginative, and altogether remarkable, A Canticle for Leibowitz retains its ability to enthrall and amaze. It is now, as it always has been, a masterpiece.",

    //         rating: 4.21,
    //         name: "Finale",
    //         genre:
    //           "Young Adult,Fantasy,Paranormal,Angels,Fantasy,Paranormal,Romance",
    //         image:
    //           "https://images.gr-assets.com/books/1362408156l/12751687.jpg",
    //       },
    //       {
    //         author: "Walter M. Miller Jr.",
    //         description:
    //           "By P.L. Travers, the author featured in the major motion picture, Saving Mr. Banks. From the moment Mary Poppins arrives at Number Seventeen Cherry-Tree Lane, everyday life at the Banks house is forever changed. It all starts when Mary Poppins is blown by the east wind onto the doorstep of the Banks house. She becomes a most unusual nanny to Jane, Michael, and the twins. Who else but Mary Poppins can slide up banisters, pull an entire armchair out of an empty carpetbag, and make a dose of medicine taste like delicious lime-juice cordial? A day with Mary Poppins is a day of magic and make-believe come to life!",

    //         rating: 3.98,
    //         name: "A Canticle for Leibowitz",
    //         genre:
    //           "Science Fiction,Fiction,Apocalyptic,Post Apocalyptic,Classics,Science Fiction,Dystopia",
    //         image: "https://images.gr-assets.com/books/1450516880l/164154.jpg",
    //       },
    //       {
    //         author: "John Green",
    //         description:
    //           "Carmen got the jeans at a thrift shop. They didn’t look all that great: they were worn, dirty, and speckled with bleach. On the night before she and her friends part for the summer, Carmen decides to toss them. But Tibby says they’re great. She'd love to have them. Lena and Bridget also think they’re fabulous. Lena decides that they should all try them on. Whoever they fit best will get them. Nobody knows why, but the pants fit everyone perfectly. Even Carmen (who never thinks she looks good in anything) thinks she looks good in the pants. Over a few bags of cheese puffs, they decide to form a sisterhood and take the vow of the Sisterhood of the Traveling Pants . . . the next morning, they say good-bye. And then the journey of the pants — and the most memorable summer of their lives — begins.",

    //         rating: 3.61,
    //         name: "An Abundance of Katherines",
    //         genre: "Young Adult,Contemporary,Fiction,Romance",
    //         image: "https://images.gr-assets.com/books/1360206426l/49750.jpg",
    //       },
    //       {
    //         author: "Ann Brashares",
    //         description:
    //           "A strong-willed and intelligent woman refuses to allow the pretensions of her husband's smug English family to ruin her life.",

    //         rating: 3.77,
    //         name: "The Sisterhood of the Traveling Pants",
    //         genre: "Young Adult,Fiction,Womens Fiction,Chick Lit,Contemporary",
    //         image: "https://images.gr-assets.com/books/1461611233l/452306.jpg",
    //       },
    //     ]);
    //   },
    // },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors;
        return Author.find({});
      },
    },
    genre: {
      type: new GraphQLList(BookType),
      args: { genre: { type: GraphQLString } },
      resolve(parent, args) {
        return Book.find({ genre: args.genre });
      },
    },
    rating: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.aggregate([{ $sort: { rating: -1 } }]);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        image: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLNonNull(GraphQLFloat) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        author: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          image: args.image,
          genre: args.genre,
          rating: args.rating,
          author: args.author,
          description: args.description,
        });

        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
