import { createStackNavigator, createAppContainer } from "react-navigation";
import Quizzes from "./Quizzes";
import Explain from "./Explain";
import Quiz from "./Quiz";
import Score from "./Score";

const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: Quizzes
        },
        Quiz: {
            screen: Quiz
        },
        Score: {
            screen: Score
        },
        Explain: {
            screen: Explain
        }
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#3A5199"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold"
            }
        }
    }
);

export default createAppContainer(StackNavigator);
