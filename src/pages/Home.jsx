import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

export default function Home() {
  return (
    <div className='w-full'>
      <ReviewBanner />
      <ReviewFlowTour />
    </div>
  );
}

/** 배너: 헤더 바로 아래 */
function ReviewBanner() {
  return (
    <section className='w-full flex flex-col gap-3 text-zinc-900 border-b  mx-auto max-w-6xl px-6  py-10 border-zinc-200'>
      <h1 className='text-2xl md:text-3xl font-semibold'>
        생각을 기록하고, 독서를 더 깊게.
      </h1>
      <p className='text-zinc-600'>
        클릭 한 번으로 책 제목, 별점, 감상을 남겨보세요.
      </p>
    </section>
  );
}

const variants = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
};

function Stars({ value = 4 }) {
  return (
    <div className='flex items-center gap-1 text-xl leading-none'>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < value ? 'text-amber-400' : 'text-zinc-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewFlowTour() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <section
      id='tour'
      className='mx-auto max-w-6xl px-6 py-2 bg-white text-zinc-900'
    >
      {/* 단계 인디케이터 */}
      <div className='py-2 my-5 text-xl font-bold'>🔥 리뷰 작성 흐름</div>
      <div className='mb-6 flex items-center gap-4'>
        {[1, 2, 3].map((n) => (
          <div key={n} className='flex items-center gap-2'>
            <div
              className={`h-7 w-7 shrink-0 rounded-full text-sm bg-brand flex items-center justify-center ${
                step >= n ? 'text-gray-50' : 'text-zinc-400'
              }`}
            >
              {n}
            </div>
            {n < 3 && (
              <div
                className={`h-[2px] w-16 rounded ${
                  step > n ? 'bg-zinc-500' : 'bg-zinc-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className='relative'>
        <AnimatePresence mode='wait'>
          {[1, 2, 3].map(
            (n) =>
              step === n && (
                <motion.div
                  key={n}
                  variants={variants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  transition={{ duration: 0.25 }}
                  className='rounded-xl border border-zinc-200 bg-white p-5 shadow-sm'
                >
                  {n === 1 && (
                    <>
                      <h2 className='text-lg font-semibold'>
                        1. 리뷰 추가하기
                      </h2>
                      <p className='mt-1 text-sm text-zinc-600'>
                        헤더의 <b>“리뷰탭”</b>이나 아래의{' '}
                        <b>“리뷰 작성 바로가기”</b>를 클릭하여 리뷰 페이지로
                        이동합니다.
                      </p>
                      <div className='mt-4'>
                        <Button onClick={() => navigate('/reviews')}>
                          리뷰 작성 바로가기
                        </Button>
                      </div>
                    </>
                  )}
                  {n === 2 && (
                    <>
                      <h2 className='text-lg font-semibold'>
                        2. 책 정보와 감상 입력
                      </h2>
                      <p className='mt-1 text-sm text-zinc-600'>
                        <b>리뷰 추가하기</b> 클릭 후, 책 제목, 별점, 감상을
                        채우고 <b>“작성 완료”</b>를 누릅니다.
                      </p>

                      {/* 폼 미리보기 (disabled) */}
                      <div className='max-w-200 mx-auto mt-4 px-4 sm:px-6 lg:px-8'>
                        <h2 className='text-xl mb-3'>리뷰 작성</h2>
                        <div className='flex grow gap-2.5 mb-2 '>
                          <Input
                            disabled
                            defaultValue='도서 제목을 입력하세요.'
                            className='flex grow h-10 rounded-md'
                          />
                          <Stars />
                        </div>
                        <Textarea
                          disabled
                          defaultValue='내용을 입력하세요.'
                          className='min-h-24 w-full'
                        />
                        <div className='w-full sm:w-auto text-center text-sm rounded-lg py-2 mt-3 text-gray-50 bg-brand'>
                          작성 완료
                        </div>
                      </div>
                    </>
                  )}
                  {n === 3 && (
                    <>
                      <h2 className='text-lg font-semibold'>3. 리뷰</h2>
                      <p className='mt-1 text-sm text-zinc-600'>
                        입력한 리뷰는 아래와 같은 카드 형태로 예쁘게 쌓입니다.
                      </p>
                      <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className='rounded-xl border border-zinc-200 bg-white p-4 shadow-sm'
                          >
                            <h3 className='font-semibold text-zinc-900'>
                              책 제목 {i}
                            </h3>
                            <Stars value={i + 2} />
                            <p className='mt-2 text-sm text-zinc-600'>
                              감상 요약이 여기에 표시됩니다.
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* 네비게이션 버튼 */}
      <div className='mt-6 flex items-center justify-between'>
        <Button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className={`px-4 py-2 text-sm disabled:opacity-50 ${
            step === 1 ? 'pointer-events-none' : 'hover:bg-brand/80'
          }`}
        >
          이전
        </Button>
        <div className='text-xs text-zinc-500'>Step {step} / 3</div>
        <Button
          onClick={() => setStep((s) => Math.min(3, s + 1))}
          disabled={step === 3}
          className={`px-4 py-2 text-sm disabled:opacity-50 ${
            step === 3 ? 'pointer-events-none' : 'hover:bg-brand/80'
          }`}
        >
          다음
        </Button>
      </div>
    </section>
  );
}
