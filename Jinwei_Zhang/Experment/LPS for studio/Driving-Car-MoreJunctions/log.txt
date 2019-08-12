% --- Specification generated for drivingCar.lps
The car has started !
% --- Start of cycle 1 ---
expect_num_of(fluent, 1, 5).
  expect(fluent, 1, location(myCar, coordinate(2, 1), northward)).
  expect(fluent, 1, location(yourCar, coordinate(6, 1), northward)).
  expect(fluent, 1, location(otherCar, coordinate(10, 5), westward)).
  expect(fluent, 1, location(troubleMaker, coordinate(6, 2), northward)).
  expect(fluent, 1, location(broken, coordinate(2, 7), noward)).

% --- Start of cycle 2 ---
expect_num_of(fluent, 2, 5).
  expect(fluent, 2, location(myCar, coordinate(2, 1), northward)).
  expect(fluent, 2, location(yourCar, coordinate(6, 1), northward)).
  expect(fluent, 2, location(otherCar, coordinate(10, 5), westward)).
  expect(fluent, 2, location(troubleMaker, coordinate(6, 2), northward)).
  expect(fluent, 2, location(broken, coordinate(2, 7), noward)).
expect_num_of(action, 1, 2, 0).
expect_num_of(observation, 1, 2, 1).
  expect(observation, 1, 2, destination(otherCar, coordinate(6, 1))).
expect_num_of(firedRules, 2, 1).
expect_num_of(resolvedGoals, 2, 0).
expect_num_of(unresolvedGoals, 2, 1).
expect_num_of(failedGoals, 2, 0).

% --- Start of cycle 3 ---
expect_num_of(fluent, 3, 5).
  expect(fluent, 3, location(myCar, coordinate(2, 1), northward)).
  expect(fluent, 3, location(yourCar, coordinate(6, 1), northward)).
  expect(fluent, 3, location(troubleMaker, coordinate(6, 2), northward)).
  expect(fluent, 3, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 3, location(otherCar, coordinate(9, 5), westward)).
expect_num_of(action, 2, 3, 1).
  expect(action, 2, 3, step(otherCar, coordinate(10, 5), coordinate(9, 5))).
expect_num_of(observation, 2, 3, 3).
  expect(observation, 2, 3, destination(myCar, coordinate(2, 9))).
  expect(observation, 2, 3, destination(troubleMaker, coordinate(8, 9))).
  expect(observation, 2, 3, destination(yourCar, coordinate(9, 9))).
expect_num_of(firedRules, 3, 3).
expect_num_of(resolvedGoals, 3, 0).
expect_num_of(unresolvedGoals, 3, 4).
expect_num_of(failedGoals, 3, 0).

% --- Start of cycle 4 ---
expect_num_of(fluent, 4, 5).
  expect(fluent, 4, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 4, location(otherCar, coordinate(8, 5), westward)).
  expect(fluent, 4, location(myCar, coordinate(2, 2), northward)).
  expect(fluent, 4, location(troubleMaker, coordinate(6, 3), northward)).
  expect(fluent, 4, location(yourCar, coordinate(6, 2), northward)).
expect_num_of(action, 3, 4, 4).
  expect(action, 3, 4, step(otherCar, coordinate(9, 5), coordinate(8, 5))).
  expect(action, 3, 4, step(myCar, coordinate(2, 1), coordinate(2, 2))).
  expect(action, 3, 4, step(troubleMaker, coordinate(6, 2), coordinate(6, 3))).
  expect(action, 3, 4, step(yourCar, coordinate(6, 1), coordinate(6, 2))).
expect_num_of(observation, 3, 4, 0).
expect_num_of(firedRules, 4, 0).
expect_num_of(resolvedGoals, 4, 0).
expect_num_of(unresolvedGoals, 4, 4).
expect_num_of(failedGoals, 4, 0).

% --- Start of cycle 5 ---
expect_num_of(fluent, 5, 5).
  expect(fluent, 5, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 5, location(otherCar, coordinate(7, 5), westward)).
  expect(fluent, 5, location(myCar, coordinate(2, 3), northward)).
  expect(fluent, 5, location(troubleMaker, coordinate(6, 4), northward)).
  expect(fluent, 5, location(yourCar, coordinate(6, 3), northward)).
expect_num_of(action, 4, 5, 4).
  expect(action, 4, 5, step(otherCar, coordinate(8, 5), coordinate(7, 5))).
  expect(action, 4, 5, step(myCar, coordinate(2, 2), coordinate(2, 3))).
  expect(action, 4, 5, step(troubleMaker, coordinate(6, 3), coordinate(6, 4))).
  expect(action, 4, 5, step(yourCar, coordinate(6, 2), coordinate(6, 3))).
expect_num_of(observation, 4, 5, 0).
expect_num_of(firedRules, 5, 0).
expect_num_of(resolvedGoals, 5, 0).
expect_num_of(unresolvedGoals, 5, 4).
expect_num_of(failedGoals, 5, 0).

% --- Start of cycle 6 ---
expect_num_of(fluent, 6, 5).
  expect(fluent, 6, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 6, location(myCar, coordinate(2, 4), northward)).
  expect(fluent, 6, location(troubleMaker, coordinate(6, 5), northward)).
  expect(fluent, 6, location(yourCar, coordinate(6, 4), northward)).
  expect(fluent, 6, location(otherCar, coordinate(6, 5), southward)).
expect_num_of(action, 5, 6, 5).
  expect(action, 5, 6, step(otherCar, coordinate(7, 5), coordinate(6, 5))).
  expect(action, 5, 6, step(myCar, coordinate(2, 3), coordinate(2, 4))).
  expect(action, 5, 6, step(troubleMaker, coordinate(6, 4), coordinate(6, 5))).
  expect(action, 5, 6, step(yourCar, coordinate(6, 3), coordinate(6, 4))).
  expect(action, 5, 6, turn(otherCar, southward)).
expect_num_of(observation, 5, 6, 0).
expect_num_of(firedRules, 6, 0).
expect_num_of(resolvedGoals, 6, 0).
expect_num_of(unresolvedGoals, 6, 4).
expect_num_of(failedGoals, 6, 0).

% --- Start of cycle 7 ---
expect_num_of(fluent, 7, 5).
  expect(fluent, 7, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 7, location(otherCar, coordinate(6, 4), southward)).
  expect(fluent, 7, location(myCar, coordinate(2, 5), northward)).
  expect(fluent, 7, location(troubleMaker, coordinate(6, 6), northward)).
  expect(fluent, 7, location(yourCar, coordinate(6, 5), northward)).
expect_num_of(action, 6, 7, 4).
  expect(action, 6, 7, step(otherCar, coordinate(6, 5), coordinate(6, 4))).
  expect(action, 6, 7, step(myCar, coordinate(2, 4), coordinate(2, 5))).
  expect(action, 6, 7, step(troubleMaker, coordinate(6, 5), coordinate(6, 6))).
  expect(action, 6, 7, step(yourCar, coordinate(6, 4), coordinate(6, 5))).
expect_num_of(observation, 6, 7, 0).
expect_num_of(firedRules, 7, 0).
expect_num_of(resolvedGoals, 7, 0).
expect_num_of(unresolvedGoals, 7, 4).
expect_num_of(failedGoals, 7, 0).

% --- Start of cycle 8 ---
expect_num_of(fluent, 8, 5).
  expect(fluent, 8, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 8, location(otherCar, coordinate(6, 3), southward)).
  expect(fluent, 8, location(myCar, coordinate(2, 6), northward)).
  expect(fluent, 8, location(troubleMaker, coordinate(6, 7), northward)).
  expect(fluent, 8, location(yourCar, coordinate(6, 6), northward)).
expect_num_of(action, 7, 8, 4).
  expect(action, 7, 8, step(otherCar, coordinate(6, 4), coordinate(6, 3))).
  expect(action, 7, 8, step(myCar, coordinate(2, 5), coordinate(2, 6))).
  expect(action, 7, 8, step(troubleMaker, coordinate(6, 6), coordinate(6, 7))).
  expect(action, 7, 8, step(yourCar, coordinate(6, 5), coordinate(6, 6))).
expect_num_of(observation, 7, 8, 0).
expect_num_of(firedRules, 8, 0).
expect_num_of(resolvedGoals, 8, 0).
expect_num_of(unresolvedGoals, 8, 4).
expect_num_of(failedGoals, 8, 0).

% --- Start of cycle 9 ---
expect_num_of(fluent, 9, 5).
  expect(fluent, 9, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 9, location(otherCar, coordinate(6, 2), southward)).
  expect(fluent, 9, location(myCar, coordinate(2, 7), northward)).
  expect(fluent, 9, location(troubleMaker, coordinate(6, 8), northward)).
  expect(fluent, 9, location(yourCar, coordinate(6, 7), northward)).
expect_num_of(action, 8, 9, 4).
  expect(action, 8, 9, step(otherCar, coordinate(6, 3), coordinate(6, 2))).
  expect(action, 8, 9, step(myCar, coordinate(2, 6), coordinate(2, 7))).
  expect(action, 8, 9, step(troubleMaker, coordinate(6, 7), coordinate(6, 8))).
  expect(action, 8, 9, step(yourCar, coordinate(6, 6), coordinate(6, 7))).
expect_num_of(observation, 8, 9, 0).
expect_num_of(firedRules, 9, 0).
expect_num_of(resolvedGoals, 9, 0).
expect_num_of(unresolvedGoals, 9, 4).
expect_num_of(failedGoals, 9, 0).

% --- Start of cycle 10 ---
expect_num_of(fluent, 10, 5).
  expect(fluent, 10, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 10, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 10, location(myCar, coordinate(2, 8), northward)).
  expect(fluent, 10, location(yourCar, coordinate(6, 8), northward)).
  expect(fluent, 10, location(troubleMaker, coordinate(6, 9), eastward)).
expect_num_of(action, 9, 10, 5).
  expect(action, 9, 10, step(otherCar, coordinate(6, 2), coordinate(6, 1))).
  expect(action, 9, 10, step(myCar, coordinate(2, 7), coordinate(2, 8))).
  expect(action, 9, 10, step(troubleMaker, coordinate(6, 8), coordinate(6, 9))).
  expect(action, 9, 10, step(yourCar, coordinate(6, 7), coordinate(6, 8))).
  expect(action, 9, 10, turn(troubleMaker, eastward)).
expect_num_of(observation, 9, 10, 0).
expect_num_of(firedRules, 10, 0).
expect_num_of(resolvedGoals, 10, 0).
expect_num_of(unresolvedGoals, 10, 4).
expect_num_of(failedGoals, 10, 0).

% --- Start of cycle 11 ---
expect_num_of(fluent, 11, 5).
  expect(fluent, 11, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 11, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 11, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 11, location(troubleMaker, coordinate(7, 9), eastward)).
  expect(fluent, 11, location(yourCar, coordinate(6, 9), eastward)).
expect_num_of(action, 10, 11, 5).
  expect(action, 10, 11, step(otherCar, coordinate(6, 3), coordinate(6, 2))).
  expect(action, 10, 11, step(myCar, coordinate(2, 8), coordinate(2, 9))).
  expect(action, 10, 11, step(troubleMaker, coordinate(6, 9), coordinate(7, 9))).
  expect(action, 10, 11, step(yourCar, coordinate(6, 8), coordinate(6, 9))).
  expect(action, 10, 11, turn(yourCar, eastward)).
expect_num_of(observation, 10, 11, 0).
expect_num_of(firedRules, 11, 0).
expect_num_of(resolvedGoals, 11, 0).
expect_num_of(unresolvedGoals, 11, 4).
expect_num_of(failedGoals, 11, 0).

% --- Start of cycle 12 ---
expect_num_of(fluent, 12, 5).
  expect(fluent, 12, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 12, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 12, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 12, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 12, location(yourCar, coordinate(7, 9), eastward)).
expect_num_of(action, 11, 12, 4).
  expect(action, 11, 12, step(otherCar, coordinate(6, 2), coordinate(6, 1))).
  expect(action, 11, 12, step(myCar, coordinate(2, 7), coordinate(2, 8))).
  expect(action, 11, 12, step(troubleMaker, coordinate(7, 9), coordinate(8, 9))).
  expect(action, 11, 12, step(yourCar, coordinate(6, 9), coordinate(7, 9))).
expect_num_of(observation, 11, 12, 0).
expect_num_of(firedRules, 12, 0).
expect_num_of(resolvedGoals, 12, 0).
expect_num_of(unresolvedGoals, 12, 4).
expect_num_of(failedGoals, 12, 0).

% --- Start of cycle 13 ---
expect_num_of(fluent, 13, 5).
  expect(fluent, 13, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 13, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 13, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 13, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 13, location(yourCar, coordinate(8, 9), eastward)).
expect_num_of(action, 12, 13, 4).
  expect(action, 12, 13, step(otherCar, coordinate(6, 3), coordinate(6, 2))).
  expect(action, 12, 13, step(myCar, coordinate(2, 8), coordinate(2, 9))).
  expect(action, 12, 13, step(troubleMaker, coordinate(6, 9), coordinate(7, 9))).
  expect(action, 12, 13, step(yourCar, coordinate(7, 9), coordinate(8, 9))).
expect_num_of(observation, 12, 13, 0).
expect_num_of(firedRules, 13, 0).
expect_num_of(resolvedGoals, 13, 0).
expect_num_of(unresolvedGoals, 13, 4).
expect_num_of(failedGoals, 13, 0).

% --- Start of cycle 14 ---
expect_num_of(fluent, 14, 5).
  expect(fluent, 14, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 14, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 14, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 14, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 14, location(yourCar, coordinate(9, 9), eastward)).
expect_num_of(action, 13, 14, 4).
  expect(action, 13, 14, step(otherCar, coordinate(6, 2), coordinate(6, 1))).
  expect(action, 13, 14, step(myCar, coordinate(2, 7), coordinate(2, 8))).
  expect(action, 13, 14, step(troubleMaker, coordinate(7, 9), coordinate(8, 9))).
  expect(action, 13, 14, step(yourCar, coordinate(8, 9), coordinate(9, 9))).
expect_num_of(observation, 13, 14, 0).
expect_num_of(firedRules, 14, 0).
expect_num_of(resolvedGoals, 14, 0).
expect_num_of(unresolvedGoals, 14, 4).
expect_num_of(failedGoals, 14, 0).

% --- Start of cycle 15 ---
expect_num_of(fluent, 15, 5).
  expect(fluent, 15, location(broken, coordinate(2, 7), noward)).
  expect(fluent, 15, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 15, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 15, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 15, location(yourCar, coordinate(9, 9), eastward)).
expect_num_of(action, 14, 15, 4).
  expect(action, 14, 15, step(otherCar, coordinate(6, 3), coordinate(6, 2))).
  expect(action, 14, 15, step(myCar, coordinate(2, 8), coordinate(2, 9))).
  expect(action, 14, 15, step(troubleMaker, coordinate(6, 9), coordinate(7, 9))).
  expect(action, 14, 15, step(yourCar, coordinate(7, 9), coordinate(8, 9))).
expect_num_of(observation, 14, 15, 0).
expect_num_of(firedRules, 15, 0).
expect_num_of(resolvedGoals, 15, 0).
expect_num_of(unresolvedGoals, 15, 4).
expect_num_of(failedGoals, 15, 0).

% --- Start of cycle 16 ---
expect_num_of(fluent, 16, 4).
  expect(fluent, 16, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 16, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 16, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 16, location(yourCar, coordinate(9, 9), eastward)).
expect_num_of(action, 15, 16, 4).
  expect(action, 15, 16, step(otherCar, coordinate(6, 2), coordinate(6, 1))).
  expect(action, 15, 16, step(myCar, coordinate(2, 7), coordinate(2, 8))).
  expect(action, 15, 16, step(troubleMaker, coordinate(7, 9), coordinate(8, 9))).
  expect(action, 15, 16, step(yourCar, coordinate(8, 9), coordinate(9, 9))).
expect_num_of(observation, 15, 16, 1).
  expect(observation, 15, 16, remove(broken)).
expect_num_of(firedRules, 16, 0).
expect_num_of(resolvedGoals, 16, 0).
expect_num_of(unresolvedGoals, 16, 4).
expect_num_of(failedGoals, 16, 0).

% --- Start of cycle 17 ---
expect_num_of(fluent, 17, 4).
  expect(fluent, 17, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 17, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 17, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 17, location(yourCar, coordinate(9, 9), eastward)).
expect_num_of(action, 16, 17, 4).
  expect(action, 16, 17, step(otherCar, coordinate(6, 3), coordinate(6, 2))).
  expect(action, 16, 17, step(myCar, coordinate(2, 8), coordinate(2, 9))).
  expect(action, 16, 17, step(troubleMaker, coordinate(6, 9), coordinate(7, 9))).
  expect(action, 16, 17, step(yourCar, coordinate(7, 9), coordinate(8, 9))).
expect_num_of(observation, 16, 17, 0).
expect_num_of(firedRules, 17, 0).
expect_num_of(resolvedGoals, 17, 0).
expect_num_of(unresolvedGoals, 17, 4).
expect_num_of(failedGoals, 17, 0).

% --- Start of cycle 18 ---
expect_num_of(fluent, 18, 4).
  expect(fluent, 18, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 18, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 18, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 18, location(yourCar, coordinate(9, 9), eastward)).
expect_num_of(action, 17, 18, 4).
  expect(action, 17, 18, step(otherCar, coordinate(6, 2), coordinate(6, 1))).
  expect(action, 17, 18, step(myCar, coordinate(2, 7), coordinate(2, 8))).
  expect(action, 17, 18, step(troubleMaker, coordinate(7, 9), coordinate(8, 9))).
  expect(action, 17, 18, step(yourCar, coordinate(8, 9), coordinate(9, 9))).
expect_num_of(observation, 17, 18, 0).
expect_num_of(firedRules, 18, 0).
expect_num_of(resolvedGoals, 18, 0).
expect_num_of(unresolvedGoals, 18, 4).
expect_num_of(failedGoals, 18, 0).

% --- Start of cycle 19 ---
expect_num_of(fluent, 19, 4).
  expect(fluent, 19, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 19, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 19, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 19, location(yourCar, coordinate(9, 9), eastward)).
expect_num_of(action, 18, 19, 4).
  expect(action, 18, 19, step(otherCar, coordinate(6, 3), coordinate(6, 2))).
  expect(action, 18, 19, step(myCar, coordinate(2, 8), coordinate(2, 9))).
  expect(action, 18, 19, step(troubleMaker, coordinate(6, 9), coordinate(7, 9))).
  expect(action, 18, 19, step(yourCar, coordinate(7, 9), coordinate(8, 9))).
expect_num_of(observation, 18, 19, 0).
expect_num_of(firedRules, 19, 0).
expect_num_of(resolvedGoals, 19, 0).
expect_num_of(unresolvedGoals, 19, 4).
expect_num_of(failedGoals, 19, 0).

% --- Start of cycle 20 ---
expect_num_of(fluent, 20, 4).
  expect(fluent, 20, location(otherCar, coordinate(6, 1), southward)).
  expect(fluent, 20, location(myCar, coordinate(2, 9), northward)).
  expect(fluent, 20, location(troubleMaker, coordinate(8, 9), eastward)).
  expect(fluent, 20, location(yourCar, coordinate(9, 9), eastward)).
expect_num_of(action, 19, 20, 4).
  expect(action, 19, 20, step(otherCar, coordinate(6, 2), coordinate(6, 1))).
  expect(action, 19, 20, step(myCar, coordinate(2, 7), coordinate(2, 8))).
  expect(action, 19, 20, step(troubleMaker, coordinate(7, 9), coordinate(8, 9))).
  expect(action, 19, 20, step(yourCar, coordinate(8, 9), coordinate(9, 9))).
expect_num_of(observation, 19, 20, 0).
expect_num_of(firedRules, 20, 0).
expect_num_of(resolvedGoals, 20, 0).
expect_num_of(unresolvedGoals, 20, 4).
expect_num_of(failedGoals, 20, 0).

