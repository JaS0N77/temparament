import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

type TemperamentType = 'sanguine' | 'melancholic' | 'choleric' | 'phlegmatic';

interface Question {
  question: string;
  type: TemperamentType;
}

const questions: Question[] = [
  { question: 'Ви легко адаптуєтесь до змін?', type: 'sanguine' },
  { question: 'Вам складно виходити із зони комфорту?', type: 'melancholic' },
  { question: 'Ви швидко виходите з себе?', type: 'choleric' },
  { question: 'Ви спокійні та врівноважені у будь-яких ситуаціях?', type: 'phlegmatic' },
];

const TestTemperament: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<Record<TemperamentType, number>>({
    sanguine: 0,
    melancholic: 0,
    choleric: 0,
    phlegmatic: 0,
  });

  const handleAnswer = (answer: boolean) => {
    const currentType = questions[questionIndex].type;
    if (answer) {
      setScores((prev) => ({ ...prev, [currentType]: prev[currentType] + 1 }));
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      askQuestion();
    } else {
      showResult();
    }
  };

  const askQuestion = () => {
    Alert.alert(
      'Питання',
      questions[questionIndex].question,
      [
        { text: 'Так', onPress: () => handleAnswer(true) },
        { text: 'Ні', onPress: () => handleAnswer(false) },
      ]
    );
  };

  const showResult = () => {
    const temperament = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as TemperamentType;
    
    const resultMessages: Record<TemperamentType, string> = {
      sanguine: 'Ви сангвінік – енергійний, життєрадісний і соціальний!',
      melancholic: 'Ви меланхолік – чутливий, глибокий і схильний до роздумів!',
      choleric: 'Ви холерик – активний, емоційний і рішучий!',
      phlegmatic: 'Ви флегматик – спокійний, надійний і врівноважений!',
    };

    Alert.alert('Результат', resultMessages[temperament]);
  };

  return (
    <View style={styles.container}>
      <Button title="Старт тесту" onPress={askQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestTemperament;
